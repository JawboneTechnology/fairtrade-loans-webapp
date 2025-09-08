interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

const Spinner = ({ size = "md", color = "text-gray-500" }: SpinnerProps) => {
  // Define size classes based on the `size` prop
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className={`inline-block animate-spin rounded-full border-solid border-current border-r-transparent ${sizeClasses[size]} ${color}`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
