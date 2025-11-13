import React from "react";
import { Spinner } from "@/components";
import { FaTrash, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmDeleteModalProps {
  onClose: () => void;
  onDelete: () => void;
  loading?: boolean;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  onClose,
  onDelete,
  loading,
}) => {
  // Animation variants for the modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  // Animation variants for the backdrop
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 text-center relative z-[10000]"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="p-6 py-10">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Warning Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 rounded-full p-4">
                <FaTrash className="text-red-600 text-5xl" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-dark mb-3">Are you sure?</h2>

            {/* Description */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-4 mb-6">
              <p className="text-gray-700 mb-2 font-medium">
                You want to delete your account <strong>permanently</strong>.
              </p>
              <p className="text-sm text-gray-600">
                This will permanently remove all your data, including:
              </p>
              <ul className="text-sm text-gray-600 mt-2 text-left list-disc list-inside space-y-1">
                <li>All loan information</li>
                <li>Payment history</li>
                <li>Personal information</li>
                <li>Account settings</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-200 p-6 space-y-3">
            <button
              onClick={onDelete}
              disabled={loading}
              className={`w-full py-3 px-6 rounded-2xl font-bold transition-all duration-200 flex items-center justify-center space-x-2 ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-lg shadow-red-500/25 hover:shadow-xl transform hover:scale-[1.02] active:scale-95"
              }`}
            >
              {loading ? (
                <>
                  <Spinner size="sm" color="text-white" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <FaTrash className="text-lg" />
                  <span>Yes, Delete Account</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              disabled={loading}
              className="w-full py-3 px-6 rounded-2xl font-semibold bg-gray-100 hover:bg-gray-200 text-dark transition-all duration-200 border border-gray-200"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmDeleteModal;
