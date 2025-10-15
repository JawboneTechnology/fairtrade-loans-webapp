import React from "react";
import useAuthStore from "@/store/UseAuthStore";
import useScreenSize from "@/hooks/useScreenSize";
import { BsExclamationTriangle } from "react-icons/bs";
import { BottomNavigationComponent, QRCodeGenerator } from "@/components";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

interface WebsiteWrapperProps {
  children: React.ReactNode;
}

const WebsiteWrapper = ({ children }: WebsiteWrapperProps) => {
  const { isDesktop } = useScreenSize();
  const { token } = useAuthStore();
  const location = useLocation();
  const pathname = location.pathname;

  // Function to copy URL to clipboard
  const copyUrlToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      toast.success("✅ Link copied to clipboard!", {
        description: "Share this link or paste it on your mobile device",
      });
    } catch (err) {
      console.error("Failed to copy URL:", err);
      // Fallback for older browsers
      try {
        const textArea = document.createElement("textarea");
        textArea.value = window.location.origin;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        toast.success("✅ Link copied to clipboard!", {
          description: "Share this link or paste it on your mobile device",
        });
      } catch (fallbackErr) {
        toast.error("❌ Failed to copy link", {
          description: "Please manually copy the URL from your browser",
        });
      }
    }
  };

  // console.log(pathname.split("/")[1]);

  // Render the restriction message if the screen is desktop
  if (isDesktop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-blue-600 flex items-center justify-center w-full relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-secondary/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-32 right-16 w-40 h-40 bg-light/20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-secondary/15 rounded-full blur-lg"></div>
          <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-light/15 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto py-16 px-12 space-y-8">
          {/* Main content card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-12 w-full">
            {/* Icon with animated glow */}
            <div className="relative flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-full p-6">
                  <BsExclamationTriangle size={60} className="text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-dark mb-2">
                Mobile Experience Only
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
            </div>

            {/* Description */}
            <div className="text-center mb-8">
              <p className="text-lg text-dark/80 leading-relaxed mb-4">
                Our Fairtrade Loans platform is specially designed for mobile
                and tablet devices to provide you with the best experience for
                managing your loans and grants.
              </p>
              <p className="text-base text-dark/60">
                Please access this website using your smartphone or tablet for
                the optimal user experience.
              </p>
            </div>

            {/* Device icons */}
            <div className="flex justify-center items-center space-x-8 mb-8">
              {/* Mobile Icon */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl p-4 mb-3">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zM8 4h4v10H8V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm text-dark/70 font-medium">Mobile</span>
              </div>

              {/* Plus Icon */}
              <div className="text-primary/50 text-2xl font-bold">+</div>

              {/* Tablet Icon */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-2xl p-4 mb-3">
                  <svg
                    className="w-8 h-8 text-secondary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v8H5V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm text-dark/70 font-medium">Tablet</span>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="bg-gradient-to-r from-light/50 to-light/30 rounded-2xl p-6 text-center">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-dark mb-2">
                  📱 Scan to Access Mobile Site
                </h3>
                <p className="text-sm text-dark/70 mb-4">
                  Scan this QR code with your mobile device to instantly access
                  the platform
                </p>
              </div>

              {/* QR Code */}
              <div className="flex justify-center mb-4">
                <div className="bg-white p-4 rounded-2xl shadow-lg">
                  <QRCodeGenerator
                    url={"http://192.168.0.11:5173/"}
                    size={160}
                    className="mx-auto"
                  />
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-3">
                {/* Alternative method */}
                <div className="flex items-center justify-center space-x-3">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="text-xs text-dark/50 font-medium">OR</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Copy URL Button */}
                <button
                  onClick={copyUrlToClipboard}
                  className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-primary font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-primary/20"
                >
                  <span>📋</span>
                  <span>Copy Link</span>
                </button>

                <div className="bg-white/50 rounded-xl p-3">
                  <p className="text-xs text-dark/60 font-medium">
                    💡 Pro Tip: Most modern phones can scan QR codes directly
                    from the camera app
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer text */}
          <div className="text-center">
            <p className="text-white/80 text-sm">
              Fairtrade Foundation • Empowering Communities Through Fair Finance
            </p>
          </div>
        </div>

        {/* Additional floating elements */}
        <div className="absolute top-10 right-10 w-3 h-3 bg-secondary rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute bottom-16 left-10 w-2 h-2 bg-light rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-secondary rounded-full opacity-40 animate-ping"></div>
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
