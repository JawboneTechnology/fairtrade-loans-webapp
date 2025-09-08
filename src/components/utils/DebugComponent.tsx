import { useState } from "react";
import { Debugger } from "@/components";
import { BugOff, BugPlay } from "lucide-react";

interface DebugComponentProps {
  title: string;
  debugData: {};
}

const DebugComponent = ({ title, debugData }: DebugComponentProps) => {
  const [showDebug, setShowDebug] = useState(false);

  const handleToggleDebug = () => {
    setShowDebug((prev) => !prev);
  };

  const debugIcon = () =>
    showDebug ? <BugOff className="text-2xl" /> : <BugPlay className="text-2xl" />;

  return (
    <>
      <div className="w-full relative">
        <div className="absolute top-0 right-0 z-10">
          <button
            className="text-dark dark:text-white p-1 rounded-full"
            onClick={handleToggleDebug}
          >
            {debugIcon()}
          </button>
        </div>

        {showDebug && <Debugger title={title} data={debugData} />}
      </div>
    </>
  );
};

export default DebugComponent;
