import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const GrantsLoadingSkeleton = () => {
  return (
    <div className="p-4">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <Skeleton
            width={150}
            height={32}
            className="mb-2"
            baseColor="#e7f8fe"
            highlightColor="#95dbf3"
          />
          <Skeleton
            width={200}
            height={20}
            baseColor="#e7f8fe"
            highlightColor="#95dbf3"
          />
        </div>
        <Skeleton
          width={180}
          height={40}
          baseColor="#e7f8fe"
          highlightColor="#95dbf3"
        />
      </div>

      {/* Stats Summary Skeletons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
          >
            <Skeleton
              width={80}
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

      {/* Grants List Skeletons */}
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-gray-100"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Skeleton
                circle
                width={40}
                height={40}
                baseColor="#e7f8fe"
                highlightColor="#95dbf3"
              />
              <Skeleton
                width={120}
                height={24}
                baseColor="#e7f8fe"
                highlightColor="#95dbf3"
              />
              <Skeleton
                width={80}
                height={24}
                baseColor="#e7f8fe"
                highlightColor="#95dbf3"
              />
            </div>
            <Skeleton width="80%" height={16} className="mb-3" />
            <div className="flex space-x-2">
              <Skeleton
                width={80}
                height={24}
                baseColor="#e7f8fe"
                highlightColor="#95dbf3"
              />
              <Skeleton
                width={120}
                height={24}
                baseColor="#e7f8fe"
                highlightColor="#95dbf3"
              />
            </div>
            <div className="flex space-x-2 mt-3">
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
              <Skeleton
                width={80}
                height={32}
                baseColor="#e7f8fe"
                highlightColor="#95dbf3"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrantsLoadingSkeleton;
