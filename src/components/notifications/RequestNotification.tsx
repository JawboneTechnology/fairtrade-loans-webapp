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

  const notificationClasses = `bg-white rounded-xl shadow-md overflow-hidden p-5 ${
    isRead
      ? "opacity-75 border-l-4 border-gray-300"
      : "border-l-4 border-secondary"
  }`;

  const renderNotificationContent = () => (
    <>
      <p className={`text-md ${isRead ? "text-gray-500" : "text-gray-900"}`}>
        {request.data.applicant_name}
      </p>
      <p
        className={`text-sm my-1 ${isRead ? "text-gray-400" : "text-gray-600"}`}
      >
        {request.message}
      </p>
      <p className="text-xs text-gray-400">{request.human_date}</p>
    </>
  );

  const renderActionButtons = () => {
    if (request.is_read) return null;

    switch (request.type) {
      case "guarantor_request":
        return (
          <div className="flex space-x-3">
            <button
              onClick={handleAccept}
              disabled={isProcessing}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg transition-colors ${
                isProcessing ? "bg-primary" : "bg-primary hover:bg-primary-dark"
              } text-white`}
            >
              <FaCheck className="mr-2" />
              {isProcessing ? "Processing..." : "Accept"}
            </button>

            <button
              onClick={handleDecline}
              disabled={isProcessing}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg transition-colors ${
                isProcessing ? "bg-red-300" : "bg-red-100 hover:bg-red-200"
              } text-red-500`}
            >
              <FaTimes className="mr-2" />
              {isProcessing ? "Processing..." : "Decline"}
            </button>
          </div>
        );
      case "guarantor_rejection":
      case "guarantor_acceptance":
        return (
          <div className="flex space-x-3">
            <button
              onClick={handleViewDetails}
              disabled={isProcessing}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg transition-colors ${
                isProcessing ? "bg-primary" : "bg-primary hover:bg-primary-dark"
              } text-white`}
            >
              {isProcessing ? (
                <Spinner color="text-white" size="sm" />
              ) : (
                "View Details"
              )}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-[95%] sm:max-w-[80%] mx-auto overflow-y-auto pb-3 mt-3">
      <div className={notificationClasses}>
        {/* Notification Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            {isRead ? (
              <FaBellSlash className="text-gray-400 mr-2 text-xl" />
            ) : (
              <FaBell className="text-primary mr-2 text-xl" />
            )}
            <h3
              className={`text-lg font-semibold ${
                isRead ? "text-gray-600" : "text-gray-800"
              }`}
            >
              {request.title}
            </h3>
          </div>

          {!isRead && onMarkAsRead && (
            <button
              onClick={markAsRead}
              className="text-xs text-gray-500 hover:text-gray-700"
              title="Mark as read"
            >
              Mark as read
            </button>
          )}
        </div>

        {/* Notification Content */}
        <div className="mb-4">
          {[
            "guarantor_request",
            "guarantor_rejection",
            "guarantor_acceptance",
          ].includes(request.type) && renderNotificationContent()}
        </div>

        {/* Action Buttons */}
        {renderActionButtons()}
      </div>
    </div>
  );
};

export default RequestNotification;
