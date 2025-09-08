import { toast } from "sonner";
import axios from "axios";
import { useEffect } from "react";
import useAuthStore from "@/store/UseAuthStore";
import { Notification } from "@/types/NotificationType";
import notificationServer from "@/hooks/useNotificationsQueries";
import {
  useState,
  ReactNode,
  useContext,
  useCallback,
  createContext,
} from "react";
import { useLocation } from "react-router-dom";

interface NotificationContextProps {
  loading: boolean;
  notifications: Notification[];
  fetchNotifications: () => void;
  handleAccept: (data: Notification) => Promise<void>;
  handleDecline: (data: Notification) => Promise<void>;
}

export const NotificationContext = createContext(
  {} as NotificationContextProps
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const { user, token } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  const { respondToRequest } = notificationServer();

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_FAIRTRADE_LOCAL
        }notifications?api_token=${token}`,
        {
          withCredentials: true,
        }
      );

      console.log(data)

      if (!data.success) {
        setLoading(false);
        console.error(data.message);
        return;
      }

      setNotifications(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const setupEventStream = useCallback(() => {
    if (!token || (pathname !== "/" && pathname !== "/notifications")) return;

    // Close existing connection if any
    if (eventSource) {
      eventSource.close();
    }

    // Include the token as a query parameter if needed
    const newEventSource = new EventSource(
      `${import.meta.env.VITE_FAIRTRADE_LOCAL}notifications?api_token=${token}`
    );

    // Listen for the event with the name 'notification'
    newEventSource.addEventListener("notification", (event) => {
      const data = JSON.parse(event.data);
      if (data.success && data.data) {
        setNotifications(data.data);
      }
    });

    newEventSource.onerror = (error) => {
      console.error("EventSource error:", error);
      setTimeout(setupEventStream, 5000);
    };

    setEventSource(newEventSource);

    return () => {
      newEventSource.close();
    };
  }, [token, pathname]);

  const handleAccept = async (data: Notification): Promise<void> => {
    if (loading) return;

    const requestData = {
      response: "accepted",
      reason: "Accepted by user " + user?.first_name + " " + user?.last_name,
      loan_id: data.data.loan_id,
      notification_id: data.id,
    };

    try {
      setLoading(true);

      const { success, message, data } = await respondToRequest(
        user?.id || "",
        requestData
      );

      if (!success) {
        setLoading(false);
        toast.error("System error!", {
          description: message,
          duration: 5000,
        });
        console.error(message);
        return;
      }

      toast.success("Request accepted successfully:", {
        description: message,
        duration: 5000,
      });
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== data.id)
      );
      setLoading(false);
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleDecline = async (data: Notification): Promise<void> => {
    if (loading) return;

    const requestData = {
      response: "declined",
      reason: "Declined by user " + user?.first_name + " " + user?.last_name,
      loan_id: data.data.loan_id,
      notification_id: data.id,
    };

    try {
      setLoading(true);

      const { success, message, data } = await respondToRequest(
        user?.id || "",
        requestData
      );

      if (!success) {
        setLoading(false);
        toast.error("System error!", {
          description: message,
          duration: 5000,
        });
        console.error(message);
        return;
      }

      toast.success("Request declined successfully:", {
        description: message,
        duration: 5000,
      });
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== data.id)
      );
      setLoading(false);
    } catch (error) {
      console.error("Error declining request:", error);
    }
  };

  useEffect(() => {
    // Close the event source if it exists
    if (eventSource) {
      eventSource.close();
    }

    if (!token || (pathname !== "/" && pathname !== "/notifications")) return;

    setupEventStream();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [token, pathname]);

  return (
    <NotificationContext.Provider
      value={{
        loading,
        handleAccept,
        handleDecline,
        notifications,
        fetchNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used within an NotificationProvider"
    );
  }

  return context;
};
