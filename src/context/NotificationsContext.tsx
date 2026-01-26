import React, { createContext, useContext, useEffect, useState, useCallback, useRef, ReactNode } from 'react';
import { initializeEcho, disconnectEcho } from '@/config/echo';
import notificationsService, { Notification } from '@/services/notificationsService';
import useAuthStore from '@/store/UseAuthStore';
import { toast } from 'sonner';
import { playNotificationSound } from '@/utils/notificationSound';

interface NotificationsContextType {
    notifications: Notification[];
    unreadCount: number;
    loading: boolean;
    error: string | null;
    fetchNotifications: () => Promise<void>;
    markAsRead: (notificationId: string | number) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    deleteNotification: (notificationId: string | number) => Promise<void>;
    refreshUnreadCount: () => Promise<void>;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

interface NotificationsProviderProps {
    children: ReactNode;
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const channelRef = useRef<any>(null);
    const isSubscribedRef = useRef<boolean>(false);
    const { user, token } = useAuthStore();

    // Fetch notifications from API
    const fetchNotifications = useCallback(async () => {
        if (!token) return;

        setLoading(true);
        setError(null);
        try {
            const { notifications, unreadCount } = await notificationsService.getNotifications();
            // Filter out any null/undefined notifications and ensure they have required fields
            const validNotifications = notifications.filter((n) => n && n.id);
            setNotifications(validNotifications);

            // Update unread count from API response meta
            setUnreadCount(unreadCount);
        } catch (err: any) {
            setError(err?.message || 'Failed to fetch notifications');
            console.error('Error fetching notifications:', err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    // Fetch unread count
    const refreshUnreadCount = useCallback(async () => {
        if (!token) return;

        try {
            const count = await notificationsService.getUnreadCount();
            setUnreadCount(count);
        } catch (err) {
            console.error('Error fetching unread count:', err);
        }
    }, [token]);

    // Mark notification as read
    const markAsRead = useCallback(async (notificationId: string | number) => {
        try {
            await notificationsService.markAsRead(notificationId);
        } catch (err: any) {
            // If 404, the endpoint doesn't exist, but we still want to update state
            if (err?.response?.status !== 404) {
                console.error('Error marking notification as read:', err);
                // Only show error toast if it's not a 404
                if (err?.response?.status !== 404) {
                    toast.error('Failed to mark notification as read');
                }
            }
        }

        // Update local state regardless of API call result
        const now = new Date().toISOString();
        setNotifications((prev) =>
            prev.map((n) =>
                n.id === notificationId ? { ...n, is_read: true, read_at: now } : n
            )
        );

        // Update unread count
        setUnreadCount((prev) => Math.max(0, prev - 1));
    }, []);

    // Mark all notifications as read
    const markAllAsRead = useCallback(async () => {
        try {
            await notificationsService.markAllAsRead();

            // Update local state
            const now = new Date().toISOString();
            setNotifications((prev) =>
                prev.map((n) => ({ ...n, is_read: true, read_at: n.read_at || now }))
            );

            // Reset unread count
            setUnreadCount(0);
            toast.success('All notifications marked as read');
        } catch (err) {
            console.error('Error marking all notifications as read:', err);
            toast.error('Failed to mark all notifications as read');
        }
    }, []);

    // Delete notification
    const deleteNotification = useCallback(async (notificationId: string | number) => {
        try {
            await notificationsService.deleteNotification(notificationId);

            // Update local state
            const notification = notifications.find((n) => n.id === notificationId);
            const wasUnread = notification && (!notification.is_read || !notification.read_at);

            setNotifications((prev) => prev.filter((n) => n.id !== notificationId));

            // Update unread count if deleted notification was unread
            if (wasUnread) {
                setUnreadCount((prev) => Math.max(0, prev - 1));
            }
        } catch (err) {
            console.error('Error deleting notification:', err);
            toast.error('Failed to delete notification');
        }
    }, [notifications]);

    // Initialize Echo and subscribe to notifications channel
    useEffect(() => {
        if (!user || !token) {
            // Disconnect if user logs out
            if (channelRef.current) {
                try {
                    channelRef.current.stopListening('.notification.new');
                    channelRef.current.stopListening('.count.updated');
                } catch (e) {
                    // Ignore cleanup errors
                }
                channelRef.current = null;
            }
            isSubscribedRef.current = false;
            disconnectEcho();
            setNotifications([]);
            setUnreadCount(0);
            return;
        }

        // Prevent duplicate subscriptions
        if (isSubscribedRef.current) {
            return;
        }

        // Initialize Echo
        const echo = initializeEcho();
        if (!echo) {
            console.warn('Echo not initialized - check VITE_REVERB_URL and VITE_REVERB_APP_KEY');
            // Still fetch notifications even if Echo fails
            fetchNotifications();
            refreshUnreadCount();
            return;
        }

        // Wait for connection to be established before subscribing
        const subscribeToChannel = () => {
            try {
                const pusher = echo.connector?.pusher;
                const connectionState = pusher?.connection?.state;

                // If already connected, subscribe immediately
                if (connectionState === 'connected') {
                    subscribe();
                } else {
                    // Wait for connection
                    pusher?.connection?.bind('connected', () => {
                        subscribe();
                    });

                    // If connection fails, still try to fetch notifications
                    pusher?.connection?.bind('error', () => {
                        console.warn('Echo connection error - fetching notifications via API only');
                        fetchNotifications();
                        refreshUnreadCount();
                    });
                }
            } catch (error) {
                console.error('Error setting up channel subscription:', error);
                // Fallback to API-only mode
                fetchNotifications();
                refreshUnreadCount();
            }
        };

        const subscribe = () => {
            if (isSubscribedRef.current) {
                return; // Already subscribed
            }

            try {
                // Subscribe to private notifications channel
                const channel = echo.private(`notifications.${user.id}`);
                channelRef.current = channel;

                // Listen for new notifications
                channel.listen('.notification.new', (data: any) => {
                    // Handle different data structures from Laravel
                    // Laravel might send:
                    // 1. { success: true, data: { notification: {...} }, timestamp: ... }
                    // 2. { notification: {...} }
                    // 3. Just the notification object directly
                    let notification: Notification | null = null;

                    if (data.success && data.data) {
                        // Structure: { success: true, data: { notification: {...} } }
                        if (data.data.notification) {
                            notification = data.data.notification;
                        } else if (data.data.id) {
                            // Structure: { success: true, data: {...notification...} }
                            notification = data.data;
                        }
                    } else if (data.notification) {
                        // Structure: { notification: {...} }
                        notification = data.notification;
                    } else if (data.id) {
                        // Structure: {...notification...} (direct notification object)
                        notification = data;
                    } else {
                        console.error('Invalid notification data structure:', data);
                        return;
                    }

                    if (!notification || !notification.id) {
                        console.error('Invalid notification data received - missing id:', notification);
                        return;
                    }

                    // Ensure notification has required fields with defaults
                    const validNotification: Notification = {
                        id: notification.id,
                        type: notification.type || 'default',
                        title: notification.title || notification.data?.title || notification.type || 'New Notification',
                        message: notification.message || notification.data?.message || notification.data?.body || 'You have a new notification',
                        data: notification.data || {},
                        is_read: notification.is_read ?? false,
                        read_at: notification.read_at || null,
                        created_at: notification.created_at || new Date().toISOString(),
                        human_date: notification.human_date || new Date(notification.created_at || new Date()).toLocaleDateString(),
                        updated_at: notification.updated_at || new Date().toISOString(),
                    };

                    // Add new notification to the list
                    setNotifications((prev) => {
                        // Check if notification already exists to avoid duplicates
                        const exists = prev.some((n) => n && n.id === validNotification.id);
                        if (exists) {
                            return prev;
                        }
                        return [validNotification, ...prev];
                    });

                    // Update unread count
                    setUnreadCount((prev) => prev + 1);

                    // Play notification sound
                    playNotificationSound();

                    // Extract notification details for toast
                    const getNotificationTitle = () => {
                        if (validNotification.data?.title) {
                            return validNotification.data.title;
                        }
                        if (validNotification.data?.name) {
                            return validNotification.data.name;
                        }
                        if (validNotification.type) {
                            return validNotification.type
                                .replace(/_/g, ' ')
                                .replace(/\b\w/g, (l: string) => l.toUpperCase());
                        }
                        return 'New Notification';
                    };

                    const getNotificationMessage = () => {
                        if (validNotification.data?.message) {
                            return validNotification.data.message;
                        }
                        if (validNotification.data?.body) {
                            return validNotification.data.body;
                        }
                        if (typeof validNotification.data === 'string') {
                            return validNotification.data;
                        }
                        if (validNotification.data?.description) {
                            return validNotification.data.description;
                        }
                        return 'You have a new notification';
                    };

                    // Show toast notification
                    toast.info(getNotificationTitle(), {
                        description: getNotificationMessage(),
                        duration: 5000,
                    });
                });

                // Listen for count updates
                channel.listen('.count.updated', (data: { unread_count: number }) => {
                    setUnreadCount(data.unread_count);
                });

                // Mark as subscribed
                isSubscribedRef.current = true;

                // Fetch initial notifications
                fetchNotifications();
                refreshUnreadCount();
            } catch (error) {
                console.error('Failed to subscribe to notifications channel:', error);
                // Fallback to API-only mode
                fetchNotifications();
                refreshUnreadCount();
            }
        };

        // Start subscription process
        subscribeToChannel();

        // Cleanup on unmount
        return () => {
            if (channelRef.current) {
                try {
                    channelRef.current.stopListening('.notification.new');
                    channelRef.current.stopListening('.count.updated');
                    // Try to leave the channel if echo is available
                    try {
                        const echo = window.Echo;
                        if (echo && user?.id) {
                            echo.leave(`notifications.${user.id}`);
                        }
                    } catch (e) {
                        // Ignore if echo is not available
                    }
                } catch (error) {
                    // Ignore cleanup errors
                }
                channelRef.current = null;
            }
            isSubscribedRef.current = false;
        };
    }, [user?.id, token, fetchNotifications, refreshUnreadCount]);

    const value: NotificationsContextType = {
        notifications,
        unreadCount,
        loading,
        error,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        refreshUnreadCount,
    };

    return (
        <NotificationsContext.Provider value={value}>
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotifications = (): NotificationsContextType => {
    const context = useContext(NotificationsContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationsProvider');
    }
    return context;
};

export default NotificationsContext;

