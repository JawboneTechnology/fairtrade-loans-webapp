import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { IoCloseCircleOutline } from "react-icons/io5";

import { ReactNode } from "react";

interface RightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drawerHeight?: string;
  children: ReactNode;
  showCloseButton?: boolean;
}

function BottomDrawer({
  isOpen,
  onClose,
  drawerHeight,
  children,
  showCloseButton = true,
}: RightDrawerProps) {
  return (
    <Drawer
      open={isOpen}
      direction="bottom"
      onClose={showCloseButton ? onClose : undefined}
      lockBackgroundScroll={true}
      style={{ height: drawerHeight ?? "100vh" }}
      zIndex={10000}
    >
      <div className="z-20 bg-white dark:bg-dark1 w-full h-full border-r border-slate-700 text-darken dark:text-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-dark dark:text-white bg-light p-1 rounded-full hover:shadow-md"
        >
          {showCloseButton && (
            <IoCloseCircleOutline className="text-3xl text-primary" />
          )}
        </button>
        {children}
      </div>
    </Drawer>
  );
}

export default BottomDrawer;
