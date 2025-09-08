import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PaymentSkeletonLoader: React.FC = () => {
  const placeholders = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="space-y-4">
      {placeholders.map((item) => (
        <div
          key={item}
          className="bg-white rounded-lg p-4 border border-light shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex justify-between items-center w-full">
              <Skeleton
                width={80}
                height={10}
                baseColor="#e7f8fe"
                highlightColor="#95dbf3"
              />
              <Skeleton
                width={50}
                height={10}
                baseColor="#e7f8fe"
                highlightColor="#95dbf3"
              />
            </div>
            <div className="flex justify-between items-center w-full">
              <Skeleton
                width={80}
                height={10}
                baseColor="#e7f8fe"
                highlightColor="#95dbf3"
              />
              <Skeleton
                width={150}
                height={10}
                baseColor="#e7f8fe"
                highlightColor="#95dbf3"
              />
            </div>
          </div>
          <div className="mt-3 flex flex-col md:flex-row md:justify-between md:items-center md:space-y-0">
            <div className="flex justify-between items-center w-full">
              <Skeleton
                width={100}
                height={10}
                baseColor="#e7f8fe"
                highlightColor="#95dbf3"
              />
              <Skeleton
                width={70}
                height={10}
                baseColor="#e7f8fe"
                highlightColor="#95dbf3"
              />
            </div>
            <div className="flex justify-between items-center w-full">
              <Skeleton
                width={150}
                height={10}
                baseColor="#e7f8fe"
                highlightColor="#95dbf3"
              />
              <Skeleton
                width={100}
                height={10}
                baseColor="#e7f8fe"
                highlightColor="#95dbf3"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentSkeletonLoader;
