import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { useUserAccount } from "@/context/UserAccountContext";
import { TextareaInput, ConfirmDeleteModal } from "@/components";

const DeleteAccountComponent = () => {
  const navigate = useNavigate();
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
      <div className="min-h-screen">
        {/* Header Section with Gradient Background */}
        <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-red-600 pb-8 pt-12 px-4 rounded-b-3xl shadow-xl">
          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-red-400/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 bg-red-300/20 rounded-full blur-lg"></div>

          {/* Header Content */}
          <div className="relative z-10">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-white hover:text-white/80 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-4 py-2 rounded-full mb-6 transition-all duration-200 active:scale-95 border border-white/20"
            >
              <HiArrowNarrowLeft className="mr-2 text-xl" />
              Back
            </button>

            {/* Title Section */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                  <FaTrash className="text-3xl text-white" />
                </div>
              </div>
              <h1 className="text-white font-bold text-2xl sm:text-3xl mb-2">
                Delete Account
              </h1>
              <p className="text-white/80 text-sm">
                This action cannot be undone
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 -mt-4 relative z-10 pb-32">
          {/* Warning Card */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-3xl p-6 mb-6">
            <div className="flex items-start space-x-3">
              <span className="text-3xl">⚠️</span>
              <div>
                <h3 className="font-bold text-red-700 mb-2">Warning: Permanent Action</h3>
                <p className="text-sm text-red-600/80">
                  Deleting your account will permanently remove all your data, including loans,
                  payments, and personal information. This action cannot be reversed.
                </p>
              </div>
            </div>
          </div>

          {/* Reasons Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-dark mb-2">
                Why are you deleting your account?
              </h2>
              <p className="text-sm text-dark/60">
                Please select a reason to help us improve our service
              </p>
            </div>

            {/* Reasons List */}
            <div className="space-y-3">
              {reasons.map((reason, index) => (
                <div key={index}>
                  <label className={`flex items-center space-x-4 p-4 border-2 rounded-2xl cursor-pointer transition-all duration-200 transform hover:scale-[1.02] ${selectedReason === reason
                    ? "bg-gradient-to-r from-red-50 to-red-100 border-red-300 shadow-md"
                    : "border-gray-200 hover:border-red-200 bg-white"
                    }`}>
                    <input
                      type="radio"
                      name="deleteReason"
                      value={reason}
                      checked={selectedReason === reason}
                      onChange={() => setSelectedReason(reason)}
                      className="hidden"
                    />
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${selectedReason === reason
                      ? "bg-red-600 border-2 border-red-600"
                      : "bg-white border-2 border-gray-300"
                      }`}>
                      {selectedReason === reason && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className={`flex-1 font-medium ${selectedReason === reason ? "text-red-700" : "text-dark"
                      }`}>
                      {reason}
                    </span>
                  </label>

                  {selectedReason === "Others" && reason === "Others" && (
                    <div className="mt-3 ml-9">
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
        </div>
      </div>

      {/* Fixed Delete Button at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
        <div className="max-w-[90%] sm:max-w-[80%] mx-auto p-4">
          <button
            onClick={toggleShowDeleteConfirm}
            disabled={selectedReason === "Others" && !otherReasonText.trim()}
            className={`w-full py-4 px-6 rounded-2xl font-bold transition-all duration-200 flex items-center justify-center space-x-2 ${selectedReason === "Others" && !otherReasonText.trim()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-lg shadow-red-500/25 hover:shadow-xl transform hover:scale-[1.02] active:scale-95"
              }`}
          >
            <FaTrash className="text-lg" />
            <span>Delete Account</span>
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
