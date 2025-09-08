import React from "react";
import useAuthStore from "@/store/UseAuthStore";
import useScreenSize from "@/hooks/useScreenSize";
import { BsExclamationTriangle } from "react-icons/bs";
import { BottomNavigationComponent } from "@/components";
import { useLocation } from "react-router-dom";

interface WebsiteWrapperProps {
  children: React.ReactNode;
}

const WebsiteWrapper = ({ children }: WebsiteWrapperProps) => {
  const { isDesktop } = useScreenSize();
  const { token } = useAuthStore();
  const location = useLocation();
  const pathname = location.pathname;

  // console.log(pathname.split("/")[1]);

  // Render the restriction message if the screen is desktop
  if (isDesktop) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center max-w-lg mx-auto py-10 px-10 space-y-4 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center justify-center border p-5 border-primary rounded-md w-full">
            <BsExclamationTriangle size={50} className="text-primary" />
            <div className="mx-auto text-primary text-xl mb-3">
              Access Restricted
            </div>
            <div className="text-gray-600 text-base text-center">
              Please use a mobile or tablet device to access this website. This
              website is only accessible on mobile and tablet devices.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Style authenticated screens
  if (token) {
    return (
      <div className="w-full h-screen flex flex-col">
        {/* Background div with primary color spanning 30% of the screen height */}
        <div className="bg-primary h-[40vh] w-full fixed top-0 left-0 z-0"></div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto relative z-10">{children}</div>

        {/* Bottom Navigation Menu */}
        {pathname !== "/edit-profile" &&
          pathname !== "/delete-account" &&
          pathname !== "/notifications" &&
          pathname !== "/dependent" &&
          pathname !== "/create-dependant" &&
          pathname !== "/apply-grant" &&
          pathname.split("/")[1] !== "loan-details" &&
          pathname.split("/")[1] !== "apply-loan" &&
          pathname !== "/update-password" && <BottomNavigationComponent />}
      </div>
    );
  } else {
    return children;
  }
};

export default WebsiteWrapper;
