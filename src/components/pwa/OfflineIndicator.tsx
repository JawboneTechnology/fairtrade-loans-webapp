import React, { useState, useEffect } from "react";
import { WifiOff, Wifi } from "lucide-react";

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowNotification(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!showNotification) return null;

  return (
    <div
      className={`fixed top-4 left-4 right-4 z-50 mx-auto max-w-sm transition-all duration-300 ${
        isOnline ? "bg-green-500 text-white" : "bg-orange-500 text-white"
      } rounded-lg shadow-lg p-3 flex items-center gap-2`}
    >
      {isOnline ? <Wifi size={20} /> : <WifiOff size={20} />}
      <span className="text-sm font-medium">
        {isOnline
          ? "Back online!"
          : "You are offline. Some features may be limited."}
      </span>
    </div>
  );
};
