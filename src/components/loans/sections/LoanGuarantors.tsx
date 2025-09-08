import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BottomDrawer, SelectGuarantorsComponent } from "@/components";

const LoanGuarantors = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const toggleShowBottomDrawer = () => setShowDrawer((prev) => !prev);

  return (
    <>
      <div className="mt-5">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">
          Select Guarantors
        </h3>

        {/* Notes */}
        <p className="text-sm text-gray-500 border-gray-200 pb-3 bg-gray-50 px-3 py-2 rounded-lg border mb-3 italic">
          Select guarantors required for your loan application. Check loan
          requirements from the loan types section.
        </p>

        <button
          onClick={toggleShowBottomDrawer}
          className="space-y-3 bg-white p-1 rounded-full border border-gray-400 w-full"
        >
          <div className="flex items-center gap-2 px-3">
            <FiSearch className="text-gray-400 text-2xl" />
            <input
              type="text"
              placeholder="Search Guarantor"
              className="w-full px-3 py-2 border-gray-300 focus:outline-none focus:border-primary"
              readOnly
            />
          </div>
        </button>
      </div>

      {/* Bottom Drawer */}
      <BottomDrawer isOpen={showDrawer} onClose={toggleShowBottomDrawer}>
        <SelectGuarantorsComponent onClose={toggleShowBottomDrawer} />
      </BottomDrawer>
    </>
  );
};

export default LoanGuarantors;
