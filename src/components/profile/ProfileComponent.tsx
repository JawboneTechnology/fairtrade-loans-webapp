import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaKey } from "react-icons/fa";
import { useUserAccount } from "@/context/UserAccountContext";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";
import useAuthStore from "@/store/UseAuthStore";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";
import { SupportContactDrawer } from "@/components";

const ProfileComponent = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { profileDetails: user } = useUserAccount();
  const { formatCurrency } = useCurrencyFormatter();
  const [showSupportDrawer, setShowSupportDrawer] = useState<boolean>(false);

  const toggleSupportDrawer = () => setShowSupportDrawer((prev) => !prev);

  return (
    <>
      <div className="min-h-screen pb-24">
        {/* Header Section with Profile Card */}
        <div className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 pb-8 pt-12 px-4 rounded-b-3xl shadow-xl">
          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-secondary/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 bg-light/10 rounded-full blur-lg"></div>

          {/* Profile Header */}
          <div className="text-center mb-6">
            <h1 className="text-white font-bold text-2xl sm:text-3xl mb-2">
              My Profile
            </h1>
            <p className="text-white/80 text-sm">
              Manage your account and settings
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 -mb-4 relative z-10">
            <div className="flex flex-col items-center">
              {/* Profile Image with Status */}
              <div className="relative mb-4">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 p-1">
                  <img
                    src={user?.passport_image || "/default-avatar.png"}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-2 border-white shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23e5e7eb'/%3E%3Ctext x='50' y='55' font-family='Arial' font-size='40' fill='%236b7280' text-anchor='middle'%3E👤%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                {/* Verification Badge */}
                <div
                  className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full border-3 border-white flex items-center justify-center ${user?.email_verified_at ? "bg-green-500" : "bg-orange-500"
                    }`}
                >
                  <span className="text-white text-xs font-bold">
                    {user?.email_verified_at ? "✓" : "!"}
                  </span>
                </div>
              </div>

              {/* User Info */}
              <h2 className="text-xl sm:text-2xl font-bold text-dark text-center mb-2">
                {user?.first_name} {user?.middle_name} {user?.last_name}
              </h2>

              <div className="space-y-1 text-center">
                <p className="text-dark/70 text-sm flex items-center justify-center space-x-1">
                  <span>📧</span>
                  <span>{user?.email}</span>
                </p>
                <p className="text-dark/70 text-sm flex items-center justify-center space-x-1">
                  <span>📱</span>
                  <span>{user?.phone_number}</span>
                </p>
              </div>

              {/* Status Badge */}
              <div
                className={`mt-4 px-4 py-2 rounded-full text-xs font-bold ${user?.email_verified_at
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
                  }`}
              >
                {user?.email_verified_at
                  ? "🎉 Verified Account"
                  : "⏳ Pending Verification"}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 mt-8 space-y-6">
          {/* Employment Details Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl">💼</span>
              <h2 className="text-xl font-bold text-dark">
                Employment Details
              </h2>
            </div>

            <div className="space-y-4">
              {/* Years of Employment */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/10">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 rounded-xl p-2">
                    <span className="text-primary text-lg">⏳</span>
                  </div>
                  <div>
                    <p className="font-semibold text-dark text-sm">
                      Experience
                    </p>
                    <p className="text-dark/60 text-xs">Years of employment</p>
                  </div>
                </div>
                <span className="font-bold text-primary text-lg">
                  {user?.years_of_employment || 0} years
                </span>
              </div>

              {/* Employee ID */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-2xl border border-secondary/10">
                <div className="flex items-center space-x-3">
                  <div className="bg-secondary/10 rounded-xl p-2">
                    <span className="text-dark text-lg">🆔</span>
                  </div>
                  <div>
                    <p className="font-semibold text-dark text-sm">
                      Employee ID
                    </p>
                    <p className="text-dark/60 text-xs">
                      Your unique identifier
                    </p>
                  </div>
                </div>
                <span className="font-bold text-dark text-sm">
                  {user?.employee_id || "N/A"}
                </span>
              </div>

              {/* Salary */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-light/30 to-light/50 rounded-2xl border border-light/30">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/50 rounded-xl p-2">
                    <span className="text-primary text-lg">💰</span>
                  </div>
                  <div>
                    <p className="font-semibold text-dark text-sm">
                      Monthly Salary
                    </p>
                    <p className="text-dark/60 text-xs">Your current income</p>
                  </div>
                </div>
                <span className="font-bold text-primary text-lg">
                  {formatCurrency(Number(user?.salary)) || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl">📊</span>
              <h2 className="text-xl font-bold text-dark">
                Financial Overview
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Loan Limit */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-5 text-center border border-primary/10">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary text-xl">🎯</span>
                </div>
                <h3 className="font-bold text-dark text-sm mb-1">Loan Limit</h3>
                <p className="text-primary font-bold text-xl">
                  {formatCurrency(Number(user?.loan_limit)) || "N/A"}
                </p>
                <p className="text-dark/60 text-xs mt-1">
                  Maximum borrowing capacity
                </p>
              </div>

              {/* Credit Score Placeholder */}
              <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl p-5 text-center border border-secondary/10">
                <div className="bg-secondary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-dark text-xl">⭐</span>
                </div>
                <h3 className="font-bold text-dark text-sm mb-1">
                  Credit Status
                </h3>
                <p className="text-dark font-bold text-lg">
                  {user?.email_verified_at ? "Good" : "Pending"}
                </p>
                <p className="text-dark/60 text-xs mt-1">
                  Based on verification status
                </p>
              </div>
            </div>
          </div>

          {/* Account Management */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl">⚙️</span>
              <h2 className="text-xl font-bold text-dark">Account Settings</h2>
            </div>

            <div className="space-y-3">
              {/* Edit Account */}
              <div
                onClick={() => navigate("/edit-profile")}
                className="group bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/15 rounded-2xl p-4 cursor-pointer transform hover:scale-[1.02] transition-all duration-200 active:scale-95 border border-primary/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 group-hover:bg-primary/20 rounded-2xl p-3 transition-colors">
                      <FaEdit className="text-primary text-lg" />
                    </div>
                    <div>
                      <h3 className="font-bold text-dark group-hover:text-primary transition-colors">
                        Edit Profile
                      </h3>
                      <p className="text-dark/60 text-sm">
                        Update your personal information
                      </p>
                    </div>
                  </div>
                  <div className="text-primary group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </div>
              </div>

              {/* My Dependents */}
              <div
                onClick={() => navigate("/dependent")}
                className="group bg-gradient-to-r from-secondary/5 to-secondary/10 hover:from-secondary/10 hover:to-secondary/15 rounded-2xl p-4 cursor-pointer transform hover:scale-[1.02] transition-all duration-200 active:scale-95 border border-secondary/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-secondary/10 group-hover:bg-secondary/20 rounded-2xl p-3 transition-colors">
                      <MdEditNote className="text-dark text-lg" />
                    </div>
                    <div>
                      <h3 className="font-bold text-dark group-hover:text-dark/80 transition-colors">
                        My Dependents
                      </h3>
                      <p className="text-dark/60 text-sm">
                        Manage family members
                      </p>
                    </div>
                  </div>
                  <div className="text-dark group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </div>
              </div>

              {/* Change Password */}
              <div
                onClick={() => navigate("/update-password")}
                className="group bg-gradient-to-r from-light/30 to-light/50 hover:from-light/40 hover:to-light/60 rounded-2xl p-4 cursor-pointer transform hover:scale-[1.02] transition-all duration-200 active:scale-95 border border-light/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/50 group-hover:bg-white/70 rounded-2xl p-3 transition-colors">
                      <FaKey className="text-primary text-lg" />
                    </div>
                    <div>
                      <h3 className="font-bold text-dark group-hover:text-primary transition-colors">
                        Change Password
                      </h3>
                      <p className="text-dark/60 text-sm">
                        Update your security credentials
                      </p>
                    </div>
                  </div>
                  <div className="text-primary group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Actions */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl">🔐</span>
              <h2 className="text-xl font-bold text-dark">
                Security & Privacy
              </h2>
            </div>

            <div className="space-y-3">
              {/* Logout */}
              <div
                onClick={logout}
                className="group bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-150 rounded-2xl p-4 cursor-pointer transform hover:scale-[1.02] transition-all duration-200 active:scale-95 border border-orange-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-orange-100 group-hover:bg-orange-200 rounded-2xl p-3 transition-colors">
                      <RiLogoutCircleRLine className="text-orange-600 text-lg" />
                    </div>
                    <div>
                      <h3 className="font-bold text-dark group-hover:text-orange-700 transition-colors">
                        Sign Out
                      </h3>
                      <p className="text-dark/60 text-sm">
                        End your current session safely
                      </p>
                    </div>
                  </div>
                  <div className="text-orange-600 group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </div>
              </div>

              {/* Delete Account */}
              <div
                onClick={() => navigate("/delete-account")}
                className="group bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-150 rounded-2xl p-4 cursor-pointer transform hover:scale-[1.02] transition-all duration-200 active:scale-95 border border-red-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-red-100 group-hover:bg-red-200 rounded-2xl p-3 transition-colors">
                      <FaTrash className="text-red-600 text-lg" />
                    </div>
                    <div>
                      <h3 className="font-bold text-dark group-hover:text-red-700 transition-colors">
                        Delete Account
                      </h3>
                      <p className="text-dark/60 text-sm">
                        Permanently remove your account
                      </p>
                    </div>
                  </div>
                  <div className="text-red-600 group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="bg-gradient-to-r from-primary/5 via-white to-secondary/5 rounded-3xl border border-gray-100 p-6 text-center">
            <div className="text-4xl mb-3">🤝</div>
            <h3 className="font-bold text-dark text-lg mb-2">
              Need Assistance?
            </h3>
            <p className="text-dark/70 text-sm mb-4">
              Our support team is available 24/7 to help you with any questions
              or concerns about your account.
            </p>
            <button
              onClick={toggleSupportDrawer}
              className="bg-white hover:bg-gray-50 text-primary font-semibold py-3 px-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              📞 Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* Support Contact Drawer */}
      <SupportContactDrawer
        isOpen={showSupportDrawer}
        onClose={toggleSupportDrawer}
      />
    </>
  );
};

export default ProfileComponent;
