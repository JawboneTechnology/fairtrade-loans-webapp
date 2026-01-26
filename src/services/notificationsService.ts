import axiosClient from '@/axiosClient';

export interface Notification {
    id: string | number;
    type: string;
    title: string;
    message: string;
    data: any;
    is_read: boolean;
    read_at: string | null;
    created_at: string;
    created_at_formatted?: string;
    human_date: string;
    updated_at?: string;
}

export interface NotificationsResponse {
    success: boolean;
    data: Notification[];
    message?: string;
    meta?: {
        current_page?: number;
        last_page?: number;
        per_page?: number;
        total?: number;
        unread_count: number;
    };
}

export interface UnreadCountResponse {
    success: boolean;
    data: {
        unread_count: number;
    };
    message?: string;
}

export const notificationsService = {
    /**
     * Fetch all notifications for the authenticated user
     */
    getNotifications: async (): Promise<{ notifications: Notification[]; unreadCount: number }> => {
        try {
            const response = await axiosClient.get<NotificationsResponse>('/notifications');
            if (response.data.success && response.data.data) {
                const notifications = response.data.data;
                const unreadCount = response.data.meta?.unread_count ?? notifications.filter((n) => !n.is_read).length;
                return { notifications, unreadCount };
            }
            return { notifications: [], unreadCount: 0 };
        } catch (error: any) {
            // If 401, the user might not be authenticated properly
            if (error?.response?.status === 401) {
                console.warn('Unauthorized: Check if authentication token is valid');
            }
            console.error('Failed to fetch notifications:', error);
            // Return empty array instead of throwing to prevent UI crashes
            return { notifications: [], unreadCount: 0 };
        }
    },

    /**
     * Mark a specific notification as read
     */
    markAsRead: async (notificationId: string | number): Promise<boolean> => {
        try {
            const response = await axiosClient.post(`/notifications/${notificationId}/mark-read`);
            return response.data.success || false;
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
            throw error;
        }
    },

    /**
     * Mark all notifications as read
     */
    markAllAsRead: async (): Promise<boolean> => {
        try {
            const response = await axiosClient.post('/notifications/mark-all-read');
            return response.data.success || false;
        } catch (error) {
            console.error('Failed to mark all notifications as read:', error);
            throw error;
        }
    },

    /**
     * Get unread notifications count
     * Falls back to calculating from notifications list if endpoint doesn't exist
     */
    getUnreadCount: async (): Promise<number> => {
        try {
            const response = await axiosClient.get<UnreadCountResponse>('/notifications/unread-count');
            if (response.data.success && response.data.data) {
                return response.data.data.unread_count || 0;
            }
            return 0;
        } catch (error: any) {
            // If endpoint doesn't exist (404), try to get from notifications meta
            if (error?.response?.status === 404) {
                try {
                    const { unreadCount } = await notificationsService.getNotifications();
                    return unreadCount;
                } catch (err) {
                    console.error('Failed to calculate unread count from notifications:', err);
                    return 0;
                }
            }
            console.error('Failed to fetch unread count:', error);
            return 0;
        }
    },

    /**
     * Delete a specific notification
     */
    deleteNotification: async (notificationId: string | number): Promise<boolean> => {
        try {
            const response = await axiosClient.delete(`/notifications/${notificationId}`);
            return response.data.success || false;
        } catch (error) {
            console.error('Failed to delete notification:', error);
            throw error;
        }
    },
};

export default notificationsService;

