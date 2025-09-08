import { toast } from "sonner";
import { FaUnlock } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import useAuthQueries from "@/hooks/useAuthQueries";
import { CompanyIcon } from "@/constants/ImageConstants";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, UniversalButton, FloatingInput } from "@/components";
import { FaCircle, FaRegCircle } from "react-icons/fa";

const UpdatePasswordExternalComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const queryParams = new URLSearchParams(location.search);

  const email = queryParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingPasswordChange, setLoadingPasswordChange] = useState(false);
  const { changePasswordExternal } = useAuthQueries();

  const toggleShowSuccessModal = () => setShowSuccessModal((prev) => !prev);

  const passwordRequirements = [
    { label: "Minimum 12 characters", check: newPassword.length >= 12 },
    { label: "One uppercase letter", check: /[A-Z]/.test(newPassword) },
    { label: "One lowercase letter", check: /[a-z]/.test(newPassword) },
    {
      label: "One special character",
      check: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    },
    { label: "One number", check: /[0-9]/.test(newPassword) },
  ];

  const isPasswordValid = passwordRequirements.every((req) => req.check);
  const doPasswordsMatch = newPassword === confirmPassword && newPassword !== "";
  const passwordStrength =
    (passwordRequirements.filter((req) => req.check).length /
      passwordRequirements.length) *
    100;

  // Handle sending reset code (OTP)
  const handleSendResetCode = async () => {
    setLoadingPasswordChange(true);

    if (!email) {
      console.log("Email not provided");
      setLoadingPasswordChange(false);
      return;
    }

    const { success, message } = await changePasswordExternal({
      email,
      password: newPassword,
    });

    if (!success) {
      toast("System Error", {
        description: message,
        duration: 5000,
      });
      setLoadingPasswordChange(false);
      return;
    }

    setTimeout(() => {
      setLoadingPasswordChange(false);
      toggleShowSuccessModal();
    }, 2000);
  };

  useEffect(() => {
    if (!email) {
      navigate(-1);
    }
  }, [email, navigate]);

  return (
    <>
      <div className="sm:max-w-[60%] sm:shadow-xl mx-auto p-6 bg-white border border-gray-200 rounded-lg mt-20 max-w-[90%]">
        <img src={CompanyIcon} alt="Company Logo" className="w-[100px] mx-auto mb-3" />
        <h3 className="text-xl font-semibold mb-5 mt-10">Change Password</h3>

        <div className="mb-6 bg-gray-50 p-3 border border-gray-200 rounded-md">
          <p className="text-sm text-gray-800 mb-3">
            You are required to change your password every 90 days. Please ensure you use a strong password to secure your account.
          </p>
        </div>

        <div className="mb-6">
          <FloatingInput
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            label="New password"
            required
            isPassword={true}
          />

          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all"
                style={{
                  width: `${passwordStrength}%`,
                  backgroundColor:
                    passwordStrength < 40 ? "red" : passwordStrength < 80 ? "orange" : "green",
                }}
              ></div>
            </div>
          </div>

          <div className="mt-3 text-sm">
            {passwordRequirements.map((req, index) => (
              <div key={index} className={`flex items-center ${req.check ? "text-green-600" : "text-gray-500"}`}>
                <span className="mr-2">{req.check ? <FaCircle size={10} /> : <FaRegCircle size={10} />}</span>
                {req.label}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <FloatingInput
            id="confirm-password"
            type="password"
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

        <button
          disabled={!isPasswordValid || !doPasswordsMatch || loadingPasswordChange}
          onClick={handleSendResetCode}
          className={`w-full py-3 text-white text-lg rounded-full transition ${
            isPasswordValid && doPasswordsMatch ? "bg-primary hover:bg-primary-dark" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loadingPasswordChange ? "Sending OTP..." : "Change Password"}
        </button>
      </div>

      {showSuccessModal && (
        <Modal onClose={toggleShowSuccessModal} className="w-full sm:w-[50%]">
          <div className="p-5 w-[95%] mx-auto bg-white rounded-xl">
            <div className="flex items-center justify-center mb-5">
              <FaCircleCheck className="text-[100px] text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-center">Password Changed <br /> Success!</h3>
            <p className="mt-2 text-gray-600">Your password has been successfully updated. You can now use your new password to log in.</p>
            <div className="mt-5">
              <UniversalButton
                className="bg-primary hover:bg-primary-dark w-full text-white rounded-full py-2 text-lg"
                title="Login Now"
                handleClick={() => navigate("/auth-login")}
                icon={<FaUnlock className="text-xl mr-2" />}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UpdatePasswordExternalComponent;
