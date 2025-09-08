import { FaCircle, FaRegCircle, FaTimes } from "react-icons/fa";
import { FloatingInput } from "@/components";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { usePasswordChange } from "@/context/PasswordChangeContext";

const PasswordChangeForm = () => {
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
      <div className="fixed top-6 left-5">
        {/* Back Button */}
        <button
          className="flex items-center text-primary hover:text-gray-700 bg-secondary hover:bg-light-hover px-6 py-2 rounded-full"
          onClick={() => window.history.back()}
        >
          <HiArrowNarrowLeft className="mr-2 text-2xl" />
          Back
        </button>
      </div>

      <div className="sm:max-w-[80%] mx-auto p-6 bg-white border border-gray-200 rounded-lg mt-20 max-w-[90%]">
        <h3 className="text-xl font-semibold mb-5">Change Password</h3>

        {/* Change password note */}
        <div className="mb-6 bg-gray-50 p-3 border border-gray-200 rounded-md">
          <p className="text-sm text-gray-800 mb-3">
            You are required to change your password every 90 days. Please
            ensure you use a strong password to secure your account.
          </p>
          <p className="text-sm text-gray-400 italic">
            Please note that changing your password will also require you to
            re-authenticate using your 2FA device.
          </p>
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
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all"
                style={{
                  width: `${passwordStrength}%`,
                  backgroundColor:
                    passwordStrength < 40
                      ? "red"
                      : passwordStrength < 80
                      ? "orange"
                      : "green",
                }}
              ></div>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="mt-3 text-sm">
            {passwordRequirements.map((req, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  req.check ? "text-green-600" : "text-gray-500"
                }`}
              >
                <span className="mr-2">
                  {req.check ? (
                    <FaCircle size={10} />
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
            <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-20">
          <button
            disabled={
              !isPasswordValid || !doPasswordsMatch || loadingPasswordChange
            }
            onClick={handleSendResetCode} // Send OTP when clicked
            className={`w-full py-2 text-white font-medium rounded-md transition ${
              isPasswordValid && doPasswordsMatch
                ? "bg-primary hover:bg-primary-dark"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {loadingPasswordChange ? "Sending OTP..." : "Change Password"}
          </button>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Enter OTP</h3>
              <button
                onClick={() => setShowOtpModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* OTP Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Enter the 6-digit OTP sent to your email/phone
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={otp}
                onChange={handleOtpChange}
                placeholder="123456"
                maxLength={6}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleOtpSubmit}
              disabled={!isOtpValid || loadingPasswordChange}
              className={`w-full py-2 text-white font-medium rounded-md transition ${
                isOtpValid
                  ? "bg-primary hover:bg-primary-dark"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {loadingPasswordChange ? "Submitting..." : "Submit OTP"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordChangeForm;
