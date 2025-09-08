import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DependentLoadingSkeleton: React.FC = () => {
  return (
    <div className="p-4">
      {/* Stats Summary Skeletons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-gray-100"
          >
            <Skeleton
              width={100}
              height={16}
              baseColor="#e7f8fe"
              highlightColor="#95dbf3"
            />
            <Skeleton
              width={60}
              height={28}
              className="mt-2"
              baseColor="#e7f8fe"
              highlightColor="#95dbf3"
            />
          </div>
        ))}
      </div>

      {/* Dependents List Skeletons */}
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-gray-100"
          >
            <div className="flex items-start space-x-3">
              <Skeleton
                circle
                width={40}
                height={40}
                baseColor="#e7f8fe"
                highlightColor="#95dbf3"
              />
              <div className="flex-1 space-y-3">
                <div className="flex justify-between">
                  <Skeleton
                    width={150}
                    height={20}
                    baseColor="#e7f8fe"
                    highlightColor="#95dbf3"
                  />
                  <Skeleton
                    width={80}
                    height={20}
                    baseColor="#e7f8fe"
                    highlightColor="#95dbf3"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Skeleton
                    width={120}
                    height={16}
                    baseColor="#e7f8fe"
                    highlightColor="#95dbf3"
                  />
                  <Skeleton
                    width={120}
                    height={16}
                    baseColor="#e7f8fe"
                    highlightColor="#95dbf3"
                  />
                  <Skeleton
                    width={200}
                    height={16}
                    baseColor="#e7f8fe"
                    highlightColor="#95dbf3"
                  />
                  <Skeleton
                    width={200}
                    height={16}
                    baseColor="#e7f8fe"
                    highlightColor="#95dbf3"
                  />
                  <Skeleton
                    width={200}
                    height={16}
                    baseColor="#e7f8fe"
                    highlightColor="#95dbf3"
                  />
                </div>
                <div className="flex space-x-2 pt-2">
                  <Skeleton
                    width={80}
                    height={32}
                    baseColor="#e7f8fe"
                    highlightColor="#95dbf3"
                  />
                  <Skeleton
                    width={80}
                    height={32}
                    baseColor="#e7f8fe"
                    highlightColor="#95dbf3"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DependentLoadingSkeleton;
