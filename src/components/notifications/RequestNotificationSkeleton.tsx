import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RequestNotificationSkeleton: React.FC = () => {
  return (
    <>
      {/* Back Button Skeleton */}
      <div className="sticky top-5 sm:top-10 w-full max-w-[90%] sm:max-w-[80%] mx-auto mb-6">
        <Skeleton width={100} height={40} borderRadius={20} />
      </div>

      {/* Main Content Skeleton */}
      <div className="w-full max-w-[90%] sm:max-w-[80%] mx-auto overflow-y-auto pb-20 mt-10 sm:mt-20">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-5 border-l-4 border-gray-200">
          {/* Header Skeleton */}
          <div className="flex items-center mb-6">
            <Skeleton circle width={24} height={24} className="mr-3" />
            <Skeleton width={150} height={20} />
          </div>

          {/* Content Skeleton */}
          <div className="mb-6 space-y-3">
            <Skeleton width={200} height={18} />
            <Skeleton width="100%" height={16} count={2} />
            <Skeleton width={100} height={14} />
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex space-x-3">
            <Skeleton width="50%" height={40} borderRadius={8} />
            <Skeleton width="50%" height={40} borderRadius={8} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestNotificationSkeleton;
