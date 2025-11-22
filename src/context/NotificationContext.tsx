import { toast } from "sonner";
import axios from "axios";
import { useEffect, useRef } from "react";
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
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    if (!token || (pathname !== "/" && pathname !== "/notifications")) {
      // Close connection if we're not on the right page
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      return;
    }

    // Close existing connection if any
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    // Clear any pending reconnection
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    const baseURL = import.meta.env.VITE_FAIRTRADE_LOCAL;
    if (!baseURL) {
      console.error("VITE_FAIRTRADE_LOCAL environment variable is not set");
      return;
    }

    const eventSourceUrl = `${baseURL}notifications?api_token=${token}`;
    console.log("Connecting to EventSource:", eventSourceUrl);

    // Include the token as a query parameter if needed
    const newEventSource = new EventSource(eventSourceUrl);

    // Handle successful connection
    newEventSource.onopen = () => {
      console.log("EventSource connected successfully");
      console.log("EventSource readyState:", newEventSource.readyState);
    };

    // Listen for the event with the name 'notification'
    newEventSource.addEventListener("notification", (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received notification event:", data);
        if (data.success && data.data) {
          setNotifications(data.data);
        }
      } catch (error) {
        console.error("Error parsing notification data:", error);
      }
    });

    // Handle generic messages (fallback)
    newEventSource.onmessage = (event) => {
      console.log("EventSource message received:", event);
      try {
        const data = JSON.parse(event.data);
        if (data.success && data.data) {
          setNotifications(data.data);
        }
      } catch (error) {
        console.error("Error parsing message data:", error);
      }
    };

    // Handle errors
    newEventSource.onerror = (error) => {
      console.error("EventSource error:", error);
      console.log("EventSource readyState:", newEventSource.readyState);
      
      // Only reconnect if connection was closed or failed
      if (newEventSource.readyState === EventSource.CLOSED) {
        console.log("EventSource closed, attempting to reconnect in 5 seconds...");
        // Close the current connection
        newEventSource.close();
        eventSourceRef.current = null;
        
        // Schedule reconnection
        reconnectTimeoutRef.current = setTimeout(() => {
          setupEventStream();
        }, 5000);
      }
    };

    eventSourceRef.current = newEventSource;
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
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    // Clear any pending reconnection
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (!token || (pathname !== "/" && pathname !== "/notifications")) {
      return;
    }

    setupEventStream();

    return () => {
      if (eventSourceRef.current) {
        console.log("Cleaning up EventSource connection");
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };
  }, [setupEventStream]);

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
