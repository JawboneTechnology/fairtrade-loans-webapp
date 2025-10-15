import {
  Spinner,
  AuthNotice,
  CustomSwitch,
  FloatingInput,
  UniversalButton,
  ResetPasswordCode,
} from "@/components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RiLock2Fill } from "react-icons/ri";
import { useLogin } from "@/context/UserLoginContext";
import { CompanyIcon } from "@/constants/ImageConstants";

const LoginComponent = () => {
  const {
    loading,
    loginErrors,
    loginFormData,
    handleLoginUser,
    showOtpCodeInput,
    handleInputChange,
    handleVerifyUserPhone,
    handleShowOtpCodeInput,
    loginFormValidationErrors,
  } = useLogin();
  const [switchOn, setSwitchOn] = useState(false);
  const toggleSwitchOn = () => setSwitchOn(!switchOn);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-white to-light/20 flex flex-col">
      {/* Header Section with Logo */}
      <div className="bg-gradient-to-r from-primary to-primary/90 pt-12 pb-8 px-6 rounded-b-3xl shadow-lg">
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center shadow-xl">
            <img
              src={CompanyIcon}
              alt="Fairtrade Foundation"
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/90 text-base">
            Sign in to manage your loans & grants
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 -mt-4 relative z-10">
            {/* Quick Stats or Features */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-primary/5 rounded-xl">
                <div className="text-primary font-bold text-lg">Fast</div>
                <div className="text-xs text-dark/60">Secure Access</div>
              </div>
              <div className="text-center p-3 bg-secondary/10 rounded-xl">
                <div className="text-dark font-bold text-lg">24/7</div>
                <div className="text-xs text-dark/60">Available</div>
              </div>
            </div>
            {/* Login Form */}
            <div className="space-y-5">
              {!showOtpCodeInput && (
                <div>
                  <label className="block text-sm font-semibold text-dark mb-2 ml-1">
                    📱 Phone Number
                  </label>
                  <FloatingInput
                    id="phone"
                    name="phone"
                    label="Enter your phone number"
                    value={loginFormData.phone}
                    onChange={handleInputChange}
                    className="mb-1 [&>input]:px-5 [&>input]:py-4 [&>input]:text-base [&>input]:rounded-xl [&>input]:border-2 [&>input]:border-gray-200 [&>input]:focus:border-primary [&>input]:bg-gray-50 [&>input]:focus:bg-white w-full"
                    error={loginFormValidationErrors.phone}
                  />
                </div>
              )}

              {showOtpCodeInput && !switchOn && (
                <div className="bg-primary/5 rounded-xl p-4">
                  <div className="text-center mb-4">
                    <div className="text-2xl mb-2">🔐</div>
                    <h3 className="font-semibold text-dark">
                      Verify Your Phone
                    </h3>
                    <p className="text-sm text-dark/60">
                      Enter the verification code sent to your phone
                    </p>
                  </div>
                  <ResetPasswordCode toggleScreens={handleShowOtpCodeInput} />
                </div>
              )}

              {!showOtpCodeInput && !switchOn && (
                <>
                  {/* Login Options */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary/10 rounded-full p-2">
                          <RiLock2Fill className="text-primary text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-dark">
                            Use Password Instead
                          </label>
                          <p className="text-xs text-dark/60">
                            Switch to password login
                          </p>
                        </div>
                      </div>
                      <CustomSwitch
                        enabled={switchOn}
                        onToggle={toggleSwitchOn}
                      />
                    </div>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="text-center mb-5">
                    <Link
                      to="/auth-password-reset"
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 bg-primary/5 px-4 py-2 rounded-full"
                    >
                      <span className="mr-1">🔑</span>
                      Forgot your password?
                    </Link>
                  </div>

                  {/* Primary Action Button */}
                  <UniversalButton
                    className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary w-full text-white rounded-2xl py-4 text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                    title={loading ? "Verifying..." : "🚀 Continue with OTP"}
                    handleClick={() => handleVerifyUserPhone()}
                    disabled={loading}
                    icon={
                      loading && <Spinner size="sm" color="text-white mr-2" />
                    }
                  />
                </>
              )}

              {switchOn && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-2 ml-1">
                      🔒 Password
                    </label>
                    <FloatingInput
                      id="password"
                      name="password"
                      label="Enter your password"
                      type="password"
                      isPassword
                      value={loginFormData.password || ""}
                      onChange={handleInputChange}
                      className="mb-1 [&>input]:px-5 [&>input]:py-4 [&>input]:text-base [&>input]:rounded-xl [&>input]:border-2 [&>input]:border-gray-200 [&>input]:focus:border-primary [&>input]:bg-gray-50 [&>input]:focus:bg-white w-full"
                      error={loginErrors.password}
                    />
                  </div>

                  {/* Switch back to OTP */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-secondary/20 rounded-full p-2">
                          <span className="text-sm">📱</span>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-dark">
                            Use OTP Instead
                          </label>
                          <p className="text-xs text-dark/60">
                            Switch to phone verification
                          </p>
                        </div>
                      </div>
                      <CustomSwitch
                        enabled={switchOn}
                        onToggle={toggleSwitchOn}
                      />
                    </div>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="text-center">
                    <Link
                      to="/auth-password-reset"
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 bg-primary/5 px-4 py-2 rounded-full"
                    >
                      <span className="mr-1">🔑</span>
                      Forgot your password?
                    </Link>
                  </div>

                  {/* Login Button */}
                  <UniversalButton
                    className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary w-full text-white rounded-2xl py-4 text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                    title={loading ? "Signing In..." : "🔐 Sign In Securely"}
                    handleClick={() => handleLoginUser()}
                    disabled={loading}
                    icon={
                      loading && <Spinner size="sm" color="text-white mr-2" />
                    }
                  />
                </div>
              )}
            </div>

            {/* Auth Notice */}
            <div className="mt-6">
              <AuthNotice />
            </div>
          </div>

          {/* Sign Up Section */}
          <div className="mt-8 text-center">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <span className="text-2xl">👋</span>
                <span className="text-lg font-semibold text-dark">
                  New to Fairtrade?
                </span>
              </div>
              <p className="text-sm text-dark/70 mb-4">
                Join thousands of users accessing fair financial services
              </p>
              <Link
                to="/auth-register"
                className="inline-flex items-center justify-center w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary text-dark font-semibold py-4 px-6 rounded-2xl shadow-lg shadow-secondary/25 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
              >
                <span className="mr-2">✨</span>
                Create Free Account
              </Link>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
              <span className="text-green-500">🔒</span>
              <span className="text-xs text-dark/60 font-medium">
                Secured with 256-bit encryption
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="text-center">
          <p className="text-xs text-dark/50">
            © 2025 Fairtrade Foundation • Empowering Communities
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
