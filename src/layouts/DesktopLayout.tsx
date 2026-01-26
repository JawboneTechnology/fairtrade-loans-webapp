import React from "react";
import useAuthStore from "@/store/UseAuthStore";
import SidebarNavigation from "@/components/navigation/SidebarNavigation";
import { CompanyLogo } from "@/constants/ImageConstants";

interface DesktopLayoutProps {
  children: React.ReactNode;
}

const DesktopLayout = ({ children }: DesktopLayoutProps) => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 bg-pattern flex">
      {/* Sidebar */}
      <aside className="w-72 shrink-0 border-r border-gray-200 bg-white/80 backdrop-blur-sm h-screen sticky top-0 overflow-y-auto">
        <div className="px-6 py-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src={CompanyLogo}
              alt="Fairtrade Foundation"
              className="h-10 w-auto object-contain"
            />
            <div>
              <div className="font-extrabold text-dark leading-tight">
                JSTL Loans App
              </div>
              <div className="text-xs text-dark/60">Desktop</div>
            </div>
          </div>

          {user && (
            <div className="mt-5 bg-gradient-to-r from-primary/5 to-secondary/10 rounded-2xl border border-gray-100 p-4">
              <div className="text-xs text-dark/60">Signed in as</div>
              <div className="font-bold text-dark truncate">
                {user.first_name} {user.last_name}
              </div>
              <div className="text-xs text-dark/60 truncate">
                {user.phone_number}
              </div>
            </div>
          )}
        </div>

        <div className="px-4 py-4">
          <SidebarNavigation />
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="sticky top-0 z-10 bg-white/75 backdrop-blur-sm border-b border-gray-200">
          <div className="px-8 mx-auto py-4 flex items-center justify-between">
            <div className="min-w-0">
              <div className="text-sm text-dark/60">Welcome</div>
              <div className="font-extrabold text-dark truncate">
                {user ? `${user.first_name} ${user.last_name}` : " "}
              </div>
            </div>

            <div className="text-sm text-dark/60">
              Manage loans, grants, payments & notifications
            </div>
          </div>
        </div>

        <main className="py-8 md:py-0">{children}</main>
      </div>
    </div>
  );
};

export default DesktopLayout;

