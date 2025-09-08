import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const GrantDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-light p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button skeleton */}
        <div className="flex items-center gap-4 mb-6 bg-white p-3">
          <Skeleton circle width={40} height={40} />
          <Skeleton width={200} height={32} />
          <div className="ml-auto">
            <Skeleton width={100} height={28} />
          </div>
        </div>

        {/* Main content grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column - Grant information skeleton */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton circle width={20} height={20} />
              <Skeleton width={150} height={24} />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton width={80} height={16} />
                <Skeleton width={120} height={20} />
              </div>

              <div className="space-y-2">
                <Skeleton width={80} height={16} />
                <Skeleton width={180} height={32} />
              </div>

              <div className="space-y-2">
                <Skeleton width={80} height={16} />
                <Skeleton width="100%" height={60} />
              </div>

              <div className="space-y-2">
                <Skeleton width={80} height={16} />
                <Skeleton width="100%" height={80} />
              </div>
            </div>
          </div>

          {/* Right column skeleton */}
          <div className="space-y-6">
            {/* Timeline section skeleton */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton circle width={20} height={20} />
                <Skeleton width={100} height={24} />
              </div>

              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton width={100} height={16} />
                    <Skeleton width={150} height={20} />
                  </div>
                ))}
              </div>
            </div>

            {/* Beneficiary section skeleton */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton circle width={20} height={20} />
                <Skeleton width={100} height={24} />
              </div>

              <div className="flex items-start gap-4">
                <Skeleton circle width={64} height={64} />
                <div className="flex-1 space-y-2">
                  <Skeleton width={120} height={20} />
                  <Skeleton width={80} height={16} />
                  <Skeleton width={100} height={16} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applicant information skeleton */}
        <div className="bg-white p-6 rounded-xl shadow-sm mt-6">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton circle width={20} height={20} />
            <Skeleton width={150} height={24} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton width={80} height={16} />
                <Skeleton width="100%" height={20} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrantDetailsSkeleton;
