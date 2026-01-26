import { HiArrowNarrowLeft } from "react-icons/hi";
import { FaBell, FaCheckCircle, FaCheck, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import { Notification } from "@/types/NotificationType";
import { useNotifications } from "@/context/NotificationsContext";
import { RequestNotification, RequestNotificationSkeleton, Modal, UniversalButton, Spinner } from "@/components";
import useAuthStore from "@/store/UseAuthStore";
import useNotificationsQueries from "@/hooks/useNotificationsQueries";
import { toast } from "sonner";
import { useState } from "react";

const NotificationsScreen = () => {
  const { loading, notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const { user } = useAuthStore();
  const { respondToRequest } = useNotificationsQueries();
  const [processing, setProcessing] = useState(false);
  const [clearingAll, setClearingAll] = useState(false);
  const [showClearAllModal, setShowClearAllModal] = useState(false);

  const readCount = notifications.length - unreadCount;

  // Convert notifications from NotificationsContext format to NotificationType format
  // The API already returns notifications with title, message, is_read, and human_date
  const convertedNotifications: Notification[] = notifications.map((n) => ({
    id: String(n.id),
    type: n.type,
    title: n.title || n.data?.title || n.type || "Notification",
    message: n.message || n.data?.message || n.data?.body || "You have a new notification",
    is_read: n.is_read ?? !n.read_at,
    created_at: n.created_at,
    human_date: n.human_date || new Date(n.created_at).toLocaleDateString(),
    data: n.data || {},
  }));

  const handleAccept = async (data: Notification): Promise<void> => {
    if (processing) return;

    const requestData = {
      response: "accepted",
      reason: "Accepted by user " + user?.first_name + " " + user?.last_name,
      loan_id: data.data.loan_id,
      notification_id: data.id.toString(),
      guarantor_id: user?.id || "",
    };

    try {
      setProcessing(true);

      const { success, message } = await respondToRequest(
        user?.id || "",
        requestData
      );

      if (!success) {
        setProcessing(false);
        toast.error("System error!", {
          description: message,
          duration: 5000,
        });
        console.error(message);
        return;
      }

      // Mark notification as read in state
      await markAsRead(data.id);

      toast.success("Request accepted successfully:", {
        description: message,
        duration: 5000,
      });
      setProcessing(false);
    } catch (error) {
      console.error("Error accepting request:", error);
      setProcessing(false);
    }
  };

  const handleDecline = async (data: Notification): Promise<void> => {
    if (processing) return;

    const requestData = {
      response: "declined",
      reason: "Declined by user " + user?.first_name + " " + user?.last_name,
      loan_id: data.data.loan_id,
      notification_id: data.id.toString(),
      guarantor_id: user?.id || "",
    };

    try {
      setProcessing(true);

      const { success, message } = await respondToRequest(
        user?.id || "",
        requestData
      );

      if (!success) {
        setProcessing(false);
        toast.error("System error!", {
          description: message,
          duration: 5000,
        });
        console.error(message);
        return;
      }

      // Mark notification as read in state
      await markAsRead(data.id);

      toast.success("Request declined successfully:", {
        description: message,
        duration: 5000,
      });
      setProcessing(false);
    } catch (error) {
      console.error("Error declining request:", error);
      setProcessing(false);
    }
  };

  const handleMarkAsRead = async (notification: Notification): Promise<void> => {
    try {
      await markAsRead(notification.id);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async (): Promise<void> => {
    if (clearingAll || unreadCount === 0) return;

    try {
      setClearingAll(true);
      await markAllAsRead();
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      toast.error("Failed to mark all notifications as read");
    } finally {
      setClearingAll(false);
    }
  };

  const handleClearAll = async (): Promise<void> => {
    if (clearingAll || notifications.length === 0) return;
    setShowClearAllModal(true);
  };

  const confirmClearAll = async (): Promise<void> => {
    if (clearingAll || notifications.length === 0) return;

    try {
      setClearingAll(true);
      setShowClearAllModal(false);

      // Delete all notifications one by one
      const deletePromises = notifications.map((notification) =>
        deleteNotification(notification.id).catch((err) => {
          console.error(`Failed to delete notification ${notification.id}:`, err);
        })
      );

      await Promise.all(deletePromises);
      toast.success("All notifications cleared successfully");
    } catch (error) {
      console.error("Error clearing all notifications:", error);
      toast.error("Failed to clear all notifications");
    } finally {
      setClearingAll(false);
    }
  };

  if (loading) {
    return <RequestNotificationSkeleton />;
  }

  return (
    <>
      {/* Enhanced Header with Gradient Background */}
      <div className="bg-gradient-to-br from-primary via-primary to-blue-600 min-h-[200px] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-secondary/20 rounded-full blur-xl"></div>

        {/* Back Button */}
        <div className="relative z-10 pt-12 px-6">
          <button
            className="flex items-center text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/20 transition-all duration-200 shadow-lg"
            onClick={() => window.history.back()}
          >
            <HiArrowNarrowLeft className="mr-2 text-xl" />
            <span className="font-medium">Back</span>
          </button>
        </div>

        {/* Header Content */}
        <div className="relative z-10 px-6 pt-6 pb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <FaBell className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Notifications
              </h1>
              <p className="text-white/80 text-sm">
                Stay updated with your account activities
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="flex space-x-3 mb-4">
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">Unread</p>
                  <p className="text-white text-2xl font-bold">{unreadCount}</p>
                </div>
                <div className="bg-secondary/80 rounded-xl p-2">
                  <FaBell className="text-dark text-lg" />
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">Read</p>
                  <p className="text-white text-2xl font-bold">{readCount}</p>
                </div>
                <div className="bg-white/20 rounded-xl p-2">
                  <FaCheckCircle className="text-white text-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {notifications.length > 0 && (
            <div className="flex items-center space-x-3">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  disabled={clearingAll}
                  className="flex-1 flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-3 rounded-2xl border-2 border-white/30 hover:border-white/50 transition-all duration-200 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <FaCheck className="text-base" />
                  <span>{clearingAll ? "Marking..." : "Mark All as Read"}</span>
                </button>
              )}
              <button
                onClick={handleClearAll}
                disabled={clearingAll}
                className="flex-1 flex items-center justify-center space-x-2 bg-red-500/30 hover:bg-red-500/40 backdrop-blur-sm px-5 py-3 rounded-2xl border-2 border-red-400/40 hover:border-red-400/60 transition-all duration-200 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <FaTrash className="text-base" />
                <span>{clearingAll ? "Clearing..." : "Clear All"}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gradient-to-b from-light/20 to-white -mt-6 rounded-t-3xl relative z-10 min-h-screen">
        <div className="px-6 pt-8 pb-20">
          {convertedNotifications.length > 0 ? (
            <div className="space-y-4">
              {convertedNotifications.map((notification) => (
                <RequestNotification
                  key={notification.id}
                  request={notification}
                  onAccept={handleAccept}
                  onDecline={handleDecline}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 max-w-sm mx-auto">
                <div className="text-6xl mb-6">🔔</div>
                <h3 className="text-xl font-bold text-dark mb-3">
                  All Caught Up!
                </h3>
                <p className="text-dark/60 mb-6">
                  You don't have any notifications right now. When you do,
                  they'll appear here.
                </p>
                <div className="bg-white/50 rounded-2xl p-4 border border-white/60">
                  <p className="text-sm text-dark/70">
                    💡 Tip: Enable push notifications to get instant updates
                    about your loans and applications
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions
          {notifications.length > 0 && (
            <div className="mt-8 bg-gradient-to-r from-primary/5 via-white to-secondary/5 rounded-3xl p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-dark text-lg mb-1">
                    Notification Settings
                  </h3>
                  <p className="text-dark/60 text-sm">
                    Manage how you receive notifications
                  </p>
                </div>
                <button className="bg-white hover:bg-gray-50 text-primary font-semibold py-3 px-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-200 shadow-lg hover:shadow-xl">
                  ⚙️ Settings
                </button>
              </div>
            </div>
          )} */}
        </div>
      </div>

      {/* Clear All Confirmation Modal */}
      {showClearAllModal && (
        <Modal
          closable={true}
          onClose={() => setShowClearAllModal(false)}
          className="w-full sm:w-[50%]"
        >
          <div className="p-6 py-10 w-[95%] mx-auto bg-white rounded-3xl">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-red-100 rounded-full p-4">
                <FaExclamationTriangle className="text-6xl text-red-600" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-center text-dark mb-3">
              Clear All Notifications?
            </h3>
            <p className="text-gray-600 text-center mb-4">
              Are you sure you want to delete all notifications? This action cannot be undone.
            </p>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 p-4 rounded-2xl mb-6">
              <p className="text-sm text-dark/80 text-center">
                <span className="font-semibold">⚠️ Warning:</span> You are about to permanently delete{" "}
                <span className="font-bold text-red-600">{notifications.length}</span> notification
                {notifications.length !== 1 ? "s" : ""}. This action cannot be reversed.
              </p>
            </div>

            <div className="space-y-3">
              {/* Confirm Button */}
              <UniversalButton
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 w-full text-white rounded-2xl py-3 text-lg font-semibold shadow-lg shadow-red-500/25 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                title={clearingAll ? "Clearing..." : "Yes, Clear All"}
                handleClick={confirmClearAll}
                icon={
                  clearingAll ? (
                    <Spinner size="sm" color="text-white" />
                  ) : (
                    <FaTrash className="text-xl" />
                  )
                }
                isCustomIcon={true}
                disabled={clearingAll}
              />

              {/* Cancel Button */}
              <UniversalButton
                className="bg-light hover:bg-gray-100 w-full text-dark rounded-2xl py-3 text-lg font-semibold border border-gray-200 transition-all duration-200"
                title="Cancel"
                handleClick={() => setShowClearAllModal(false)}
                disabled={clearingAll}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default NotificationsScreen;
