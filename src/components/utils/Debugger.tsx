import { MdLockPerson } from "react-icons/md";

interface DebuggerProps {
  title: string;
  data: any;
}

const Debugger: React.FC<DebuggerProps> = ({ title, data }) => {
  return (
    <div className="mt-5 bg-white max-h-[800px] overflow-y-scroll border border-gray-200 rounded-md">
      <h1 className="text-lg font-bold text-dark leading-none border-b border-gray-200 py-5 px-3">
        {title} Debugger
      </h1>
      <pre className="text-xs text-dark1 dark:text-dark4 my-5 px-3">
        {JSON.stringify(data, null, 2)}
      </pre>

      <div className="flex items-start gap-2 px-3 border-t border-gray-200 py-3">
        <div className="p-[5px] border border-gray-200 rounded-full">
          <MdLockPerson className="text-lg text-primary" />
        </div>
        <p className="text-dark text-base font-normal">
          Debugging data to ensure it's being passed correctly and accurately
        </p>
      </div>
    </div>
  );
};

export default Debugger;
