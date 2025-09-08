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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-white rounded-md m-3 h-[calc(100vh-30px)] w-full shadow-sm">
        <div className="h-full w-full flex flex-col justify-center items-center">
          <div className="p-5 w-full max-w-lg mx-auto border rounded-xl">
            <div className="text-center p-5">
              {/* Company Logo */}
              <img
                src={CompanyIcon}
                alt="Company Logo"
                className="w-[100px] mx-auto mb-3"
              />
              <h1 className="text-2xl font-bold">Sign In</h1>
              {/* Welcoming Text */}
              <p className="text-gray-500 mt-2">
                Welcome back! Please login to your account.
              </p>
            </div>
            <div>
              {!showOtpCodeInput && (
                <div className="mb-5">
                  <FloatingInput
                    id="firstName"
                    name="phone"
                    label="Phone Number"
                    value={loginFormData.phone}
                    onChange={handleInputChange}
                    className="mb-1 [&>input]:px-4 [&>input]:py-3 [&>input]:text-lg w-full"
                    error={loginFormValidationErrors.phone}
                  />
                </div>
              )}

              {showOtpCodeInput && !switchOn && (
                <div className="mb-5">
                  <ResetPasswordCode toggleScreens={handleShowOtpCodeInput} />
                </div>
              )}

              {!showOtpCodeInput && !switchOn && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CustomSwitch
                        enabled={switchOn}
                        onToggle={toggleSwitchOn}
                      />
                      <label
                        htmlFor="use_password"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Use Password
                      </label>
                    </div>
                    <div className="text-sm">
                      <Link
                        to="/auth-password-reset"
                        className="font-medium text-primary hover:text-primary-dark"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <div className="mt-5">
                    <UniversalButton
                      className="bg-primary hover:bg-primary-dark w-full text-white rounded-full py-2 text-lg"
                      title="Verify Phone Number"
                      handleClick={() => handleVerifyUserPhone()}
                      icon={
                        loading ? (
                          <Spinner size="sm" color="text-white mr-2" />
                        ) : (
                          <RiLock2Fill className="text-xl mr-2" />
                        )
                      }
                    />
                  </div>
                </>
              )}

              {switchOn && (
                <div className="mt-5">
                  <FloatingInput
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    isPassword
                    value={loginFormData.password || ""}
                    onChange={handleInputChange}
                    className="mb-1 [&>input]:px-4 [&>input]:py-3 [&>input]:text-lg w-full"
                    error={loginErrors.password}
                  />

                  <div className="flex items-center justify-between mt-5">
                    <div className="flex items-center">
                      <CustomSwitch
                        enabled={switchOn}
                        onToggle={toggleSwitchOn}
                      />
                      <label
                        htmlFor="use_password"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Use OTP
                      </label>
                    </div>
                    <div className="text-sm">
                      <Link
                        to="/auth-password-reset"
                        className="font-medium text-primary hover:text-primary-dark"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <div className="mt-5">
                    <UniversalButton
                      className="bg-primary hover:bg-primary-dark w-full text-white rounded-full py-2 text-lg"
                      title="Login"
                      handleClick={() => handleLoginUser()}
                      icon={
                        loading ? (
                          <Spinner size="sm" color="text-white mr-2" />
                        ) : (
                          <RiLock2Fill className="text-xl mr-2" />
                        )
                      }
                    />
                  </div>
                </div>
              )}

              <div className="mt-5 flex justify-center">
                <Link to="/auth-register" className="text-sm font-medium">
                  Don't have an account with Fairtrade?{" "}
                  <span className="text-primary font-semibold">
                    Register Now!
                  </span>
                </Link>
              </div>
            </div>

            <AuthNotice />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
