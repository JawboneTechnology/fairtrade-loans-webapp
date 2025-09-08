import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const GrantApplicationSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br to-gray-100 p-4 md:p-6 pb-20">
      <div className="max-w-3xl mx-auto">
        {/* Header Skeleton */}
        <div className="fixed top-5 sm:top-10 w-full max-w-[90%] sm:max-w-[80%] mx-auto z-20 ml-3 sm:ml-20">
          <Skeleton width={100} height={40} />
        </div>

        {/* Form Skeleton */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-14">
          <div className="p-6 md:p-8">
            <div className="space-y-6">
              {/* Title */}
              <Skeleton width={200} height={32} />

              {/* Grant Type Section */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <Skeleton circle width={24} height={24} className="mr-2" />
                  <Skeleton width={150} height={24} />
                </div>
                <Skeleton width={250} height={16} />

                {/* Grant Type Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px]">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex justify-between">
                        <Skeleton width={120} height={20} />
                        <Skeleton circle width={20} height={20} />
                      </div>
                      <Skeleton width={180} height={16} className="mt-2" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Dependent Selection Skeleton */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <Skeleton circle width={24} height={24} className="mr-2" />
                  <Skeleton width={180} height={24} />
                </div>
                <Skeleton width={250} height={16} />
                <Skeleton height={48} />
              </div>

              {/* Amount Skeleton */}
              <div className="space-y-2">
                <Skeleton width={200} height={20} />
                <div className="relative">
                  <Skeleton height={48} />
                </div>
                <Skeleton width={180} height={16} />
              </div>

              {/* Reason Skeleton */}
              <div className="space-y-2">
                <Skeleton width={200} height={20} />
                <Skeleton height={96} />
                <Skeleton width={100} height={16} />
              </div>

              {/* Submit Button Skeleton */}
              <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-4">
                <Skeleton height={48} className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrantApplicationSkeleton;
