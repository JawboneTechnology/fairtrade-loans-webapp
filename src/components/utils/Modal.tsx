import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ReactNode } from "react";

interface ModalProps {
  onClose?: () => void;
  className?: string;
  children: ReactNode;
  closable?: boolean;
}

const Modal = ({ onClose, className, children, closable }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const closeModel = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current === e.target && closable) {
      onClose?.();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        onClick={closeModel}
        className="fixed inset-0 bg-black bg-opacity-60 z-[999999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={`dark:text-gray1 w-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${className} shadow-xl`}
          initial={{ y: "-50%", x: "-50%", scale: 0.5 }}
          animate={{ y: "-50%", x: "-50%", scale: 1 }}
          exit={{ y: "-50%", x: "-50%", scale: 0.5, opacity: 0 }}
        >
          <div className="overflow-y-scroll h-full">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
