import React from "react";

interface CustomSwitchProps {
  enabled: boolean;
  onToggle: () => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ enabled, onToggle }) => {
  return (
    <div
      className={`custom-switch ${enabled ? "active" : ""}`}
      onClick={onToggle}
    >
      <div className="switch-toggle"></div>
    </div>
  );
};

export default CustomSwitch;
