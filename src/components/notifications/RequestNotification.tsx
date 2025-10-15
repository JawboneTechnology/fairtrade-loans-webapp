import { Spinner } from "@/components";
import React, { useState } from "react";
import axiosClient from "@/axiosClient";
import { useNavigate } from "react-router-dom";
import { Notification } from "@/types/NotificationType";
import { FaBell, FaCheck, FaTimes, FaBellSlash } from "react-icons/fa";

interface RequestNotificationProps {
  request: Notification;
  onAccept: (noti: Notification) => Promise<void>;
  onDecline: (noti: Notification) => Promise<void>;
  onMarkAsRead?: (noti: Notification) => Promise<void>;
}

const RequestNotification: React.FC<RequestNotificationProps> = ({
  request,
  onAccept,
  onDecline,
  onMarkAsRead,
}) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRead, setIsRead] = useState(request.is_read);

  const handleAction = async (
    action: () => Promise<void>,
    successMessage: string,
    errorMessage: string
  ) => {
    setIsProcessing(true);
    try {
      await action();
      await markAsRead();
      console.log(successMessage);
    } catch (error) {
      console.log(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAccept = () =>
    handleAction(
      () => onAccept(request),
      "Request accepted successfully",
      "Failed to accept request"
    );

  const handleDecline = () =>
    handleAction(
      () => onDecline(request),
      "Request declined successfully",
      "Failed to decline request"
    );

  const markAsRead = async () => {
    if (!isRead && onMarkAsRead) {
      try {
        await onMarkAsRead(request);
        setIsRead(true);
      } catch (error) {
        console.error("Failed to mark as read", error);
      }
    }
  };

  const handleViewDetails = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      const response = await axiosClient.post(
        `notifications/${request.id}/read`
      );
      if (!response.data.success) {
        console.error(response.data.message);
        return;
      }
      setIsRead(true);
      console.log("Action completed successfully:", response.data.message);
      navigate("/loan-details/" + request.data.loan_id);
    } finally {
      setIsProcessing(false);
    }
  };

  const notificationClasses = `relative overflow-hidden transition-all duration-200 ${
    isRead
      ? "bg-gray-50 border-gray-200"
      : "bg-white border-primary/20 shadow-lg hover:shadow-xl"
  } rounded-3xl border-2 p-6`;

  const renderNotificationContent = () => (
    <>
      <div className="flex items-center space-x-3 mb-3">
        <div
          className={`w-3 h-3 rounded-full ${
            isRead ? "bg-gray-300" : "bg-primary animate-pulse"
          }`}
        ></div>
        <p
          className={`font-semibold ${isRead ? "text-gray-500" : "text-dark"}`}
        >
          {request.data.applicant_name}
        </p>
      </div>
      <p
        className={`text-sm mb-3 leading-relaxed ${
          isRead ? "text-gray-400" : "text-dark/70"
        }`}
      >
        {request.message}
      </p>
      <div className="flex items-center text-xs text-gray-400">
        <span className="mr-1">🕐</span>
        {request.human_date}
      </div>
    </>
  );

  const renderActionButtons = () => {
    if (request.is_read) return null;

    switch (request.type) {
      case "guarantor_request":
        return (
          <div className="flex space-x-3 mt-4">
            <button
              onClick={handleAccept}
              disabled={isProcessing}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                isProcessing
                  ? "bg-primary/70 cursor-not-allowed"
                  : "bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 shadow-lg hover:shadow-xl"
              } text-white`}
            >
              <FaCheck className="mr-2" />
              {isProcessing ? "Processing..." : "Accept"}
            </button>

            <button
              onClick={handleDecline}
              disabled={isProcessing}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                isProcessing
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 border border-red-300"
              } text-red-600`}
            >
              <FaTimes className="mr-2" />
              {isProcessing ? "Processing..." : "Decline"}
            </button>
          </div>
        );
      case "guarantor_rejection":
      case "guarantor_acceptance":
        return (
          <div className="flex space-x-3 mt-4">
            <button
              onClick={handleViewDetails}
              disabled={isProcessing}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                isProcessing
                  ? "bg-primary/70 cursor-not-allowed"
                  : "bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 shadow-lg hover:shadow-xl"
              } text-white`}
            >
              {isProcessing ? (
                <Spinner color="text-white" size="sm" />
              ) : (
                <>
                  <span className="mr-2">👀</span>
                  View Details
                </>
              )}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={notificationClasses}>
      {/* Notification Type Badge */}
      <div className="absolute top-4 right-4">
        {isRead ? (
          <div className="bg-gray-200 text-gray-500 px-3 py-1 rounded-full text-xs font-medium">
            Read
          </div>
        ) : (
          <div className="bg-gradient-to-r from-primary to-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
            New
          </div>
        )}
      </div>

      {/* Notification Header */}
      <div className="flex items-start space-x-4 mb-4">
        <div
          className={`p-3 rounded-2xl ${
            isRead
              ? "bg-gray-200"
              : "bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/20"
          }`}
        >
          {isRead ? (
            <FaBellSlash className="text-gray-400 text-xl" />
          ) : (
            <FaBell className="text-primary text-xl" />
          )}
        </div>

        <div className="flex-1">
          <h3
            className={`text-lg font-bold mb-1 ${
              isRead ? "text-gray-600" : "text-dark"
            }`}
          >
            {request.title}
          </h3>

          {!isRead && onMarkAsRead && (
            <button
              onClick={markAsRead}
              className="text-xs text-primary hover:text-primary/80 font-medium bg-primary/5 hover:bg-primary/10 px-2 py-1 rounded-lg transition-colors"
              title="Mark as read"
            >
              ✓ Mark as read
            </button>
          )}
        </div>
      </div>

      {/* Notification Content */}
      <div>
        {[
          "guarantor_request",
          "guarantor_rejection",
          "guarantor_acceptance",
        ].includes(request.type) && renderNotificationContent()}
      </div>

      {/* Action Buttons */}
      {renderActionButtons()}

      {/* Decorative gradient line at bottom for unread notifications */}
      {!isRead && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-500 to-primary rounded-b-3xl"></div>
      )}
    </div>
  );
};

export default RequestNotification;
