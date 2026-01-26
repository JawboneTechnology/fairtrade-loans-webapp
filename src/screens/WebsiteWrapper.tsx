import React from "react";
import useAuthStore from "@/store/UseAuthStore";
import useScreenSize from "@/hooks/useScreenSize";
import { BottomNavigationComponent } from "@/components";
import { useLocation } from "react-router-dom";
import DesktopLayout from "@/layouts/DesktopLayout";

interface WebsiteWrapperProps {
  children: React.ReactNode;
}

const WebsiteWrapper = ({ children }: WebsiteWrapperProps) => {
  const { isDesktop } = useScreenSize();
  const { token } = useAuthStore();
  const location = useLocation();
  const pathname = location.pathname;

  // Style authenticated screens
  if (token) {
    if (isDesktop) {
      return <DesktopLayout>{children}</DesktopLayout>;
    }

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
