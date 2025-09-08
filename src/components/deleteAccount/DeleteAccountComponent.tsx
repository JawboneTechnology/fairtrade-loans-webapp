import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useUserAccount } from "@/context/UserAccountContext";
import { TextareaInput, ConfirmDeleteModal } from "@/components";

const DeleteAccountComponent = () => {
  const [selectedReason, setSelectedReason] = useState(
    "No longer using the service/platform"
  );
  const [otherReasonText, setOtherReasonText] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { handleDeleteProfile, loadingAccountDelete } = useUserAccount();

  const toggleShowDeleteConfirm = () => setShowDeleteConfirm((prev) => !prev);

  const reasons = [
    "No longer using the service/platform",
    "Found a better alternative",
    "Privacy concerns",
    "Too many emails/notifications",
    "Difficulty navigating the platform",
    "Account security concerns",
    "Personal reasons",
    "Others",
  ];

  const handleDelete = () => {
    const reason =
      selectedReason === "Others" ? otherReasonText : selectedReason;
    handleDeleteProfile(reason, toggleShowDeleteConfirm);
  };

  return (
    <>
      <div className="w-full h-full bg-white overflow-y-scroll pb-[200px]">
        <div className="bg-white p-6 rounded-2xl mt-5 pb-10">
          <div className="w-[400px] sm:w-[600px]">
            {/* Back Button */}
            <button
              className="flex items-center text-primary hover:text-gray-700 bg-secondary/50 hover:bg-light-hover px-6 py-2 rounded-full mb-10"
              onClick={() => window.history.back()}
            >
              <IoArrowBack className="mr-2 text-2xl" />
              Back
            </button>

            {/* Title */}
            <h1 className="text-3xl font-semibold mb-2">Delete Account</h1>
            <p className="text-gray-500 text-base mb-5">
              If you need to delete an account, please provide a reason.
            </p>
          </div>

          {/* Reasons List */}
          <div className="space-y-5">
            {reasons.map((reason, index) => (
              <div key={index}>
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="deleteReason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={() => setSelectedReason(reason)}
                    className="form-radio text-blue-500"
                  />
                  <span className="text-gray-700">{reason}</span>
                </label>

                {selectedReason === "Others" && reason === "Others" && (
                  <div className="mt-3">
                    <TextareaInput
                      value={otherReasonText}
                      onChange={(e) => setOtherReasonText(e.target.value)}
                      placeholder="Please specify the reason..."
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Delete Button */}
        <div className="fixed bottom-0 w-full sm:w-[600px] px-5 sm:px-0 py-3 bg-white border-t border-gray-200">
          <button
            onClick={toggleShowDeleteConfirm}
            className="w-full bg-primary text-white py-3 rounded-full hover:bg-gray-800 transition"
          >
            Delete Account
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <ConfirmDeleteModal
          onClose={toggleShowDeleteConfirm}
          onDelete={handleDelete}
          loading={loadingAccountDelete}
        />
      )}
    </>
  );
};

export default DeleteAccountComponent;
