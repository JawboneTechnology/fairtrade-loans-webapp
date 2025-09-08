import React from "react";

interface ProgressBarProps {
  completed: number;
  bgColor?: string;
  height?: string;
  borderRadius?: string;
  isLabelVisible?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  completed,
  bgColor = "#2aa3ff",
  height = "13px",
  borderRadius = "8px",
  isLabelVisible = false,
}) => {
  // Container styles
  const containerStyles = {
    height: height,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: borderRadius,
    overflow: "hidden",
  };

  // Filler styles
  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgColor,
    borderRadius: borderRadius,
    transition: "width 0.5s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  };

  // Label styles
  const labelStyles = {
    color: "white",
    fontSize: "12px",
    padding: "0 5px",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        {isLabelVisible && <span style={labelStyles}>{`${completed}%`}</span>}
      </div>
    </div>
  );
};

export default ProgressBar;
