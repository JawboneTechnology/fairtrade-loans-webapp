import React from "react";
import { Spinner } from "@/components";
import { IoHelpCircle } from "react-icons/io5";
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
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="bg-white rounded-2xl shadow-lg w-96 text-center"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="p-6">
            {/* Warning Icon */}
            <div className="flex justify-center mb-3">
              <IoHelpCircle className="text-primary text-[100px]" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-2">Are you sure?</h2>

            {/* Description */}
            <p className="text-gray-600 mb-5">
              You want to delete your account <br />{" "}
              <strong>permanently</strong>.
            </p>
            <p className="text-gray-400 text-sm italic">
              Ensuring that the user understands the consequences of deleting
              their account (
              <span className="font-semibold text-black">
                loss of data, subscriptions, etc.
              </span>
              ).
            </p>
          </div>

          <div className="">
            {/* Action Buttons */}
            <div className="grid grid-cols-2 pt-5">
              <div className="border-r border-t border-gray-200 p-4">
                <button
                  onClick={onDelete}
                  className="text-red-500 font-medium hover:underline px-4"
                >
                  {loading ? (
                    <Spinner size="sm" color="text-red-500" />
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>

              <div className="border-t border-gray-200 p-4">
                <button
                  onClick={onClose}
                  className="text-blue-500 font-medium hover:underline px-4"
                >
                  Keep Account
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmDeleteModal;
