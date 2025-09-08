import React from "react";

interface CircularProgressBarProps {
  completed: number;
  bgColor?: string;
  height?: string;
  isLabelVisible?: boolean;
  labelSize?: string;
  label?: string;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  completed,
  bgColor = "#0fbffc",
  height = "100px",
  isLabelVisible = false,
  labelSize = "20px",
  label = "Complete",
}) => {
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (completed / 100) * circumference;

  return (
    <div style={{ position: "relative", width: height, height: height }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 120 120"
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      {/* Optional label */}
      {isLabelVisible && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: "bold",
            color: bgColor,
          }}
          className="text-center"
        >
          <h5
            style={{ fontSize: labelSize }}
            className="leading-none text-center"
          >{`${completed}%`}</h5>
          <p className="text-center">{label}</p>
        </div>
      )}
    </div>
  );
};

export default CircularProgressBar;
