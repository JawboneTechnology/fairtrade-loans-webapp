import { ReactNode } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { Spinner, UniversalButton } from "@/components";

interface AskUserConcentProps {
  title: string;
  loading?: boolean;
  onClose: () => void;
  handleAction: () => void;
  description?: string | ReactNode;
}

const AccountDeleteConsent = ({
  title,
  onClose,
  loading,
  description,
  handleAction,
}: AskUserConcentProps) => {
  return (
    <div className="w-[95%] mx-auto text-center bg-white rounded-md shadow-md pt-6 pb-5">
      <div className="px-5">
        <div className="w-full flex justify-center mb-5">
          <BsQuestionCircle className="text-primary text-[80px]" />
        </div>

        <h3 className="text-2xl font-bold max-w-[300px] mx-auto mb-5">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mt-2 text-center">
          {description ??
            "This will mark all your notifications as read. Are you sure you want to continue?"}
        </p>
      </div>

      <div className="mt-5 flex justify-center gap-2 px-5">
        <UniversalButton
          title="Cancel"
          handleClick={onClose}
          className="flex text-primary items-center gap-2 text-base w-full py-2 rounded-md bg-secondary"
        />
        <UniversalButton
          title={!loading && "Continue"}
          handleClick={handleAction}
          className="flex items-center gap-2 text-base w-full py-2 rounded-md bg-primary text-white"
          icon={
            loading ? (
              <Spinner size="sm" color="text-white mr-2" />
            ) : null
          }
        />
      </div>
    </div>
  );
};

export default AccountDeleteConsent;
