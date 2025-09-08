import { RiLock2Fill } from "react-icons/ri";
import { useLogin } from "@/context/UserLoginContext";
import { CompanyIcon } from "@/constants/ImageConstants";
import {
  Modal,
  Spinner,
  AuthNotice,
  FloatingInput,
  UniversalButton,
} from "@/components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdMarkEmailRead } from "react-icons/md";

const PasswordResetComponent = () => {
  const {
    loading,
    verifyOtpData,
    handleVerifyOtp,
    handleOtpChange,
    emailPasswordReset,
    handleEmailInputChange,
    handleSendResetPasswordOtp,
  } = useLogin();
  const [showModal, setShowModal] = useState(false);
  const toggleShowModal = () => setShowModal((prev) => !prev);

  return (
    <>
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
                <h1 className="text-2xl font-bold">Reset Password!</h1>
                {/* Welcoming Text */}
                <p className="text-gray-500 mt-2">
                  Enter the email address used when creating your account. We
                  will send you a verification code to your email or SMS.
                </p>
              </div>
              <div>
                <div className="mb-5">
                  <FloatingInput
                    id="email"
                    name="email"
                    label="Email Address"
                    value={emailPasswordReset?.email}
                    onChange={handleEmailInputChange}
                    className="mb-1 [&>input]:px-4 [&>input]:py-3 [&>input]:text-lg w-full"
                    error={null}
                  />
                </div>

                <div className="mt-5">
                  <UniversalButton
                    className="bg-primary hover:bg-primary-dark w-full text-white rounded-full py-2 text-lg"
                    title={!loading && "Send verification code"}
                    handleClick={() => {
                      handleSendResetPasswordOtp(toggleShowModal);
                    }}
                    icon={
                      loading ? (
                        <Spinner size="sm" color="text-white mr-2" />
                      ) : (
                        <RiLock2Fill className="text-xl mr-2" />
                      )
                    }
                  />
                </div>

                <div className="mt-5 flex justify-center">
                  <Link
                    to="/auth-login"
                    className="text-primary text-sm font-semibold"
                  >
                    Back to login
                  </Link>
                </div>
              </div>

              <AuthNotice />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal onClose={toggleShowModal} className="w-full sm:w-[50%]">
          <div className="p-5 w-[95%] mx-auto bg-white rounded-xl">
            <div className="flex items-center justify-center mb-5">
              <MdMarkEmailRead className="text-[80px] text-primary" />
            </div>

            <h1 className="text-2xl font-bold text-center">
              Verification Code Sent!
            </h1>
            <p className="text-gray-500 mt-2 text-center">
              We have sent a verification code to your email. Please check your
              email and enter the code below.
            </p>
            <p className="text-green-500 text-center font-semibold">
              {verifyOtpData.email}
            </p>

            <div className="mt-5">
              <FloatingInput
                id="otp_code"
                name="otp_code"
                label="Verification Code"
                value={verifyOtpData?.code}
                onChange={handleOtpChange}
                className="mb-1 [&>input]:px-4 [&>input]:py-3 [&>input]:text-lg w-full"
              />
            </div>

            <div className="mt-5">
              <UniversalButton
                className="bg-primary hover:bg-primary-dark w-full text-white rounded-full py-2 text-lg"
                title={!loading && "Verify Code"}
                handleClick={() => handleVerifyOtp(toggleShowModal)}
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
        </Modal>
      )}
    </>
  );
};

export default PasswordResetComponent;
