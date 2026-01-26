/**
 * Utility function to play notification sound
 * Handles browser autoplay restrictions by unlocking audio on first user interaction
 */
let audioInstance: HTMLAudioElement | null = null;
let audioUnlocked = false;

// Import the sound file - Vite will handle the path resolution
const soundPath = new URL('../sounds/bell-notification-sound.mp3', import.meta.url).href;

/**
 * Initialize audio and unlock it for autoplay
 * Should be called on first user interaction (click, touch, etc.)
 */
export const unlockAudio = (): void => {
    if (audioUnlocked) return;

    try {
        if (!audioInstance) {
            audioInstance = new Audio(soundPath);
            audioInstance.volume = 0.5; // Set volume to 50%
            audioInstance.preload = 'auto';
        }

        // Play and immediately pause to "unlock" audio for future autoplay
        const playPromise = audioInstance.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    audioInstance?.pause();
                    audioInstance!.currentTime = 0;
                    audioUnlocked = true;
                })
                .catch(() => {
                    // Audio unlock failed, will try again on next interaction
                });
        }
    } catch (error) {
        // Ignore errors during unlock
    }
};

/**
 * Play notification sound
 * Only works if audio has been unlocked via user interaction
 */
export const playNotificationSound = (): void => {
    // If audio hasn't been unlocked yet, don't try to play
    // It will be unlocked on next user interaction
    if (!audioUnlocked) {
        return;
    }

    try {
        if (!audioInstance) {
            audioInstance = new Audio(soundPath);
            audioInstance.volume = 0.5;
            audioInstance.preload = 'auto';
        }

        // Reset and play the sound
        audioInstance.currentTime = 0;
        audioInstance.play().catch(() => {
            // Audio play failed, reset unlock status to try again on next interaction
            audioUnlocked = false;
        });
    } catch (error) {
        // Ignore errors
    }
};

export default playNotificationSound;

