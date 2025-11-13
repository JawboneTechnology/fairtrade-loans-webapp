import { FaCircle, FaRegCircle, FaTimes } from "react-icons/fa";
import { FloatingInput, Modal, Spinner } from "@/components";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { usePasswordChange } from "@/context/PasswordChangeContext";

const PasswordChangeForm = () => {
  const navigate = useNavigate();
  const {
    otp,
    isOtpValid,
    oldPassword,
    newPassword,
    showOtpModal,
    setOldPassword,
    setNewPassword,
    confirmPassword,
    showOldPassword,
    showNewPassword,
    setShowOtpModal,
    isPasswordValid,
    handleOtpSubmit,
    handleOtpChange,
    doPasswordsMatch,
    passwordStrength,
    setConfirmPassword,
    showConfirmPassword,
    handleSendResetCode,
    passwordRequirements,
    loadingPasswordChange,
  } = usePasswordChange();

  return (
    <>
      <div className="min-h-screen">
        {/* Header Section with Gradient Background */}
        <div className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 pb-8 pt-12 px-4 rounded-b-3xl shadow-xl">
          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-secondary/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 bg-light/10 rounded-full blur-lg"></div>

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
                  <FaKey className="text-3xl text-white" />
                </div>
              </div>
              <h1 className="text-white font-bold text-2xl sm:text-3xl mb-2">
                Change Password
              </h1>
              <p className="text-white/80 text-sm">
                Update your account security credentials
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 -mt-4 relative z-10 pb-32">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">

            {/* Change password note */}
            <div className="mb-6 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 p-4 rounded-2xl">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <p className="text-sm text-dark/80 mb-2 font-medium">
                    You are required to change your password every 90 days. Please
                    ensure you use a strong password to secure your account.
                  </p>
                  <p className="text-xs text-dark/60 italic">
                    ⚠️ Note: Changing your password will require you to
                    re-authenticate using your 2FA device.
                  </p>
                </div>
              </div>
            </div>

            {/* Old Password */}
            <div className="mb-6">
              <FloatingInput
                id="old-password"
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                label="Old password"
                required
                isPassword={true}
              />
            </div>

            {/* New Password */}
            <div className="mb-6">
              <FloatingInput
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                label="New password"
                required
                isPassword={true}
              />

              {/* Password Strength Progress Bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-dark/60 font-medium">Password Strength</p>
                  <p className={`text-xs font-semibold ${passwordStrength < 40
                    ? "text-red-600"
                    : passwordStrength < 80
                      ? "text-orange-600"
                      : "text-green-600"
                    }`}>
                    {passwordStrength < 40
                      ? "Weak"
                      : passwordStrength < 80
                        ? "Medium"
                        : "Strong"}
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${passwordStrength}%`,
                      backgroundColor:
                        passwordStrength < 40
                          ? "#ef4444"
                          : passwordStrength < 80
                            ? "#f97316"
                            : "#22c55e",
                    }}
                  ></div>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="mt-4 space-y-2">
                <p className="text-xs font-semibold text-dark/70 mb-2">Password Requirements:</p>
                {passwordRequirements.map((req, index) => (
                  <div
                    key={index}
                    className={`flex items-center text-sm ${req.check ? "text-green-600" : "text-dark/50"
                      }`}
                  >
                    <span className="mr-2">
                      {req.check ? (
                        <FaCircle size={10} className="text-green-600" />
                      ) : (
                        <FaRegCircle size={10} />
                      )}
                    </span>
                    {req.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <FloatingInput
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="Confirm New Password"
                required
                isPassword={true}
              />
              {!doPasswordsMatch && confirmPassword.length > 0 && (
                <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>Passwords do not match.</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Submit Button at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
        <div className="max-w-[90%] sm:max-w-[80%] mx-auto p-4">
          <button
            disabled={
              !isPasswordValid || !doPasswordsMatch || loadingPasswordChange
            }
            onClick={handleSendResetCode}
            className={`w-full py-4 px-6 rounded-2xl font-bold transition-all duration-200 flex items-center justify-center space-x-2 ${isPasswordValid && doPasswordsMatch && !loadingPasswordChange
              ? "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl transform hover:scale-[1.02] active:scale-95"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {loadingPasswordChange ? (
              <>
                <Spinner size="sm" color="text-white" />
                <span>Sending OTP...</span>
              </>
            ) : (
              <>
                <FaKey className="text-lg" />
                <span>Change Password</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <Modal onClose={() => setShowOtpModal(false)} className="w-full sm:w-[50%]">
          <div className="p-6 py-10 w-[95%] mx-auto bg-white rounded-3xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 rounded-full p-3">
                  <FaKey className="text-2xl text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-dark">Enter OTP</h3>
                  <p className="text-sm text-dark/60">Verify your identity</p>
                </div>
              </div>
              <button
                onClick={() => setShowOtpModal(false)}
                className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* OTP Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-dark mb-3">
                Enter the 6-digit OTP sent to your email/phone
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center text-2xl font-bold tracking-widest"
                value={otp}
                onChange={handleOtpChange}
                placeholder="000000"
                maxLength={6}
              />
              {otp.length > 0 && otp.length < 6 && (
                <p className="text-xs text-dark/50 mt-2 text-center">
                  Enter {6 - otp.length} more digit{6 - otp.length > 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleOtpSubmit}
              disabled={!isOtpValid || loadingPasswordChange}
              className={`w-full py-4 px-6 rounded-2xl font-bold transition-all duration-200 flex items-center justify-center space-x-2 ${isOtpValid && !loadingPasswordChange
                ? "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl transform hover:scale-[1.02] active:scale-95"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              {loadingPasswordChange ? (
                <>
                  <Spinner size="sm" color="text-white" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <FaKey className="text-lg" />
                  <span>Verify OTP</span>
                </>
              )}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PasswordChangeForm;
