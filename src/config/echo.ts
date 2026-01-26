import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import useAuthStore from '@/store/UseAuthStore';

// Declare Pusher on window for Laravel Echo
declare global {
    interface Window {
        Pusher: typeof Pusher;
        Echo: any;
    }
}

window.Pusher = Pusher;

let echoInstance: any = null;
let isConnecting = false;

export const initializeEcho = (): any => {
    const token = useAuthStore.getState().token;

    if (!token) {
        console.warn('No authentication token found. Echo will not be initialized.');
        return null;
    }

    // If already connecting, return existing instance
    if (isConnecting && echoInstance) {
        return echoInstance;
    }

    // If instance already exists and is connected, return it
    if (echoInstance) {
        try {
            const state = echoInstance.connector?.pusher?.connection?.state;
            if (state === 'connected' || state === 'connecting') {
                return echoInstance;
            }
        } catch (e) {
            // If we can't check state, proceed with reinitialization
        }

        // Only disconnect if not currently connecting
        if (!isConnecting) {
            try {
                echoInstance.disconnect();
            } catch (e) {
                // Ignore disconnect errors
            }
        }
    }

    const reverbUrl = import.meta.env.VITE_REVERB_URL;

    if (!reverbUrl) {
        console.warn('VITE_REVERB_URL is not set. Echo will not be initialized.');
        return null;
    }

    try {
        // Parse the Reverb URL
        const url = new URL(reverbUrl);
        const wsHost = url.hostname;
        const wsPort = url.port || (url.protocol === 'wss:' ? 443 : 8080);
        const wsScheme = url.protocol === 'wss:' ? 'https' : 'http';
        const isSecure = wsScheme === 'https' || url.protocol === 'wss:';

        // Get API base URL for auth endpoint
        const apiBaseUrl = import.meta.env.VITE_FAIRTRADE_LOCAL || '';
        const appKey = import.meta.env.VITE_REVERB_APP_KEY || import.meta.env.VITE_PUSHER_APP_KEY;

        if (!appKey) {
            console.warn('VITE_REVERB_APP_KEY is not set or is using default value. Please set it in your .env file.');
        }

        const echoConfig: any = {
            broadcaster: 'reverb',
            key: appKey,
            wsHost: wsHost,
            wsPort: parseInt(wsPort.toString()),
            wssPort: parseInt(wsPort.toString()),
            forceTLS: isSecure,
            enabledTransports: ['ws', 'wss'],
            disableStats: true,
        };

        // Only add auth if API base URL is available
        if (apiBaseUrl) {
            echoConfig.authEndpoint = `${apiBaseUrl}broadcasting/auth`;
            echoConfig.auth = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            };
        }

        console.log('Initializing Echo with config:', {
            wsHost,
            wsPort,
            isSecure,
            authEndpoint: echoConfig.authEndpoint,
        });

        isConnecting = true;
        echoInstance = new Echo(echoConfig);

        // Add connection event listeners for debugging
        const pusher = echoInstance.connector?.pusher;
        if (pusher) {
            pusher.connection.bind('error', (err: any) => {
                console.error('Pusher connection error:', err);
                isConnecting = false;
            });

            pusher.connection.bind('connected', () => {
                console.log('Echo connected successfully');
                isConnecting = false;
            });

            pusher.connection.bind('disconnected', () => {
                console.log('Echo disconnected');
                isConnecting = false;
            });

            pusher.connection.bind('unavailable', () => {
                console.warn('Echo connection unavailable');
                isConnecting = false;
            });

            pusher.connection.bind('failed', () => {
                console.warn('Echo connection failed');
                isConnecting = false;
            });
        }

        window.Echo = echoInstance;
        return echoInstance;
    } catch (error) {
        console.error('Failed to initialize Echo:', error);
        isConnecting = false;
        return null;
    }
};

export const disconnectEcho = (): void => {
    if (echoInstance) {
        try {
            // Only disconnect if not currently connecting
            if (!isConnecting) {
                const state = echoInstance.connector?.pusher?.connection?.state;
                // Only disconnect if connected or connecting
                if (state === 'connected' || state === 'connecting') {
                    echoInstance.disconnect();
                }
            }
        } catch (e) {
            // Ignore errors during disconnect
        } finally {
            echoInstance = null;
            isConnecting = false;
            if (window.Echo) {
                delete window.Echo;
            }
        }
    }
};

export const getEcho = (): any => {
    return echoInstance;
};

export default echoInstance;

