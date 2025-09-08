import { HiArrowNarrowLeft } from "react-icons/hi";
import { BsExclamationCircle } from "react-icons/bs";
import { Notification } from "@/types/NotificationType";
import { useNotification } from "@/context/NotificationContext";
import { RequestNotification, RequestNotificationSkeleton } from "@/components";

const NotificationsScreen = () => {
  const { loading, notifications, handleAccept, handleDecline } =
    useNotification();

  if (loading) {
    return <RequestNotificationSkeleton />;
  }

  return (
    <>
      <div className="fixed z-10 top-6 left-5">
        <button
          className="flex items-center text-primary hover:text-gray-700 bg-secondary hover:bg-light-hover px-6 py-2 rounded-full"
          onClick={() => window.history.back()}
        >
          <HiArrowNarrowLeft className="mr-2 text-2xl" />
          Back
        </button>
      </div>

      <div className="w-full max-w-[90%] sm:max-w-[80%] mx-auto overflow-y-auto pb-[200px] mt-16">
        {/* Notification Title Area */}
        <div className="sticky top-5 mt-5 sm:top-10 w-full max-w-[95%] sm:max-w-[80%] mx-auto bg-white rounded-xl shadow-md p-5">
          <h2 className="text-2xl font-semibold text-dark">Notifications</h2>
          <p className="text-sm text-gray-500">
            You have{" "}
            {
              notifications.filter((notification) => !notification.is_read)
                .length
            }{" "}
            unread notifications.
          </p>
        </div>

        {notifications.map((notification) => {
          return (
            <RequestNotification
              key={notification.id}
              request={notification as Notification}
              onAccept={handleAccept}
              onDecline={handleDecline}
            />
          );
        })}

        {notifications.length === 0 && (
          <div className="max-w-[95%] sm:max-w-[80%] text-center mt-3 mx-auto p-5 bg-white rounded-xl shadow-md min-h-[500px] overflow-hidden flex flex-col items-center justify-center">
            <BsExclamationCircle className="text-5xl text-primary mb-4" />
            <p className="text-gray-500">No notifications available.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationsScreen;
