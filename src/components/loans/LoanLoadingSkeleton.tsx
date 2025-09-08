import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoanLoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg border p-6">
          <Skeleton
            height={20}
            width={150}
            baseColor="#e7f8fe"
            highlightColor="#95dbf3"
          />
          <Skeleton
            height={20}
            width={200}
            baseColor="#e7f8fe"
            highlightColor="#95dbf3"
          />
          <Skeleton
            height={20}
            width={180}
            baseColor="#e7f8fe"
            highlightColor="#95dbf3"
          />
          <Skeleton
            height={20}
            width={120}
            baseColor="#e7f8fe"
            highlightColor="#95dbf3"
          />
          <Skeleton
            height={20}
            width={100}
            baseColor="#e7f8fe"
            highlightColor="#95dbf3"
          />

          {/* Buttons */}
          <div className="mt-4 flex flex-col items-center justify-end">
            <Skeleton
              height={30}
              width={300}
              baseColor="#e7f8fe"
              highlightColor="#95dbf3"
            />
            <Skeleton
              height={30}
              width={300}
              baseColor="#e7f8fe"
              highlightColor="#95dbf3"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoanLoadingSkeleton;
