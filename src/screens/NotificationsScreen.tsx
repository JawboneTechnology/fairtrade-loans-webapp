import { HiArrowNarrowLeft } from "react-icons/hi";
import { FaBell, FaCheckCircle } from "react-icons/fa";
import { Notification } from "@/types/NotificationType";
import { useNotification } from "@/context/NotificationContext";
import { RequestNotification, RequestNotificationSkeleton } from "@/components";

const NotificationsScreen = () => {
  const { loading, notifications, handleAccept, handleDecline } =
    useNotification();

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;
  const readCount = notifications.length - unreadCount;

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
          <div className="flex space-x-3">
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
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gradient-to-b from-light/20 to-white -mt-6 rounded-t-3xl relative z-10 min-h-screen">
        <div className="px-6 pt-8 pb-20">
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <RequestNotification
                  key={notification.id}
                  request={notification as Notification}
                  onAccept={handleAccept}
                  onDecline={handleDecline}
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
    </>
  );
};

export default NotificationsScreen;
