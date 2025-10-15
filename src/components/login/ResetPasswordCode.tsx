import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/UseAuthStore";
import useAuthQueries from "@/hooks/useAuthQueries";
import { useLogin } from "@/context/UserLoginContext";
import { UniversalButton, DebugComponent } from "@/components";
import { useRef, useState, ChangeEvent, KeyboardEvent } from "react";

interface ResetPasswordProps {
  toggleScreens: (screen: string) => void;
}

const ResetPasswordCode = ({ toggleScreens }: ResetPasswordProps) => {
  const { setToken, setProfile } = useAuthStore();
  const { loginFormData, setLoginFormData } = useLogin();
  const [resetCode, setResetCode] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const { confirmOTPCode } = useAuthQueries();
  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newCode = [...resetCode];
      newCode[index] = value;
      setResetCode(newCode);
      setLoginFormData(() => ({
        ...loginFormData,
        otp_code: newCode.join(""),
      }));

      if (index < 5 && value !== "") {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle key down
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newCode = [...resetCode];
      if (resetCode[index] !== "") {
        newCode[index] = "";
        setResetCode(newCode);
        setLoginFormData(() => ({
          ...loginFormData,
          otp_code: newCode.join(""),
        }));
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // Send reset code
  const handleSendResetCode = async () => {
    setLoading(true);

    const { success, message, data } = await confirmOTPCode(loginFormData);

    if (!success) {
      toast.error(message);
      setLoading(false);
      return;
    }

    const newData = {
      id: data.user?.id,
      first_name: data.user?.first_name,
      middle_name: data.user?.middle_name,
      last_name: data.user?.last_name,
      address: data.user?.address,
      dob: data.user?.dob,
      gender: data.user?.gender,
      phone_number: data.user?.phone_number,
      passport_image: data.user?.passport_image,
      years_of_employment: data.user?.years_of_employment,
      salary: data.user?.salary,
    };

    if (data?.is_profile_complete) {
      setProfile(newData);
      setToken(data.token);
      toggleScreens("reset-password-confirm");
    } else {
      setProfile(newData);
      navigate("/auth-validate-profile");
      toggleScreens("reset-password-confirm");
    }

    setLoading(false);
    toast.success(message);
  };

  const disabled = !loginFormData?.otp_code || loading;
  const isCodeComplete = resetCode.every((digit) => digit !== "");

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <span className="text-2xl">📱</span>
        </div>
        <h3 className="text-xl font-bold text-dark mb-2">
          Enter Verification Code
        </h3>
        <p className="text-sm text-dark/70 leading-relaxed">
          We've sent a 6-digit code to your phone number ending in{" "}
          <span className="font-semibold text-primary">
            ***{loginFormData.phone?.slice(-3)}
          </span>
        </p>
      </div>

      {/* OTP Input Section */}
      <div className="space-y-4">
        <div className="flex justify-center gap-2 sm:gap-3">
          {resetCode.map((digit, index) => (
            <div key={index} className="relative">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={digit}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                className={`
                  w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold
                  border-2 rounded-xl transition-all duration-200
                  ${
                    digit
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-200 bg-gray-50 text-dark hover:border-gray-300"
                  }
                  focus:outline-none focus:border-primary focus:bg-white focus:shadow-lg focus:scale-105
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
                disabled={loading}
                autoComplete="one-time-code"
              />

              {/* Animated underline */}
              <div
                className={`
                absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 rounded-full transition-all duration-300
                ${digit ? "w-8 bg-primary" : "w-0 bg-gray-300"}
              `}
              />
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center">
          <div className="flex space-x-1">
            {resetCode.map((digit, index) => (
              <div
                key={index}
                className={`
                  w-2 h-2 rounded-full transition-all duration-200
                  ${digit ? "bg-primary" : "bg-gray-200"}
                `}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <UniversalButton
          title={
            loading
              ? "Verifying..."
              : isCodeComplete
              ? "🚀 Verify & Continue"
              : "Enter Complete Code"
          }
          className={`
            w-full py-4 text-lg font-semibold rounded-2xl transition-all duration-200
            ${
              disabled
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl transform hover:scale-[1.02]"
            }
          `}
          handleClick={handleSendResetCode}
          disabled={disabled}
        />

        {/* Resend Code */}
        <div className="text-center">
          <button
            onClick={() => {
              // Add resend functionality here
              toast.info("Resending code...");
            }}
            className="text-sm text-primary hover:text-primary/80 font-medium bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-full transition-colors"
            disabled={loading}
          >
            📤 Didn't receive code? Resend
          </button>
        </div>
      </div>

      {/* Timer or additional info */}
      <div className="bg-gray-50 rounded-xl p-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="text-sm">⏱️</span>
          <span className="text-sm font-medium text-dark">
            Code expires in 5 minutes
          </span>
        </div>
        <p className="text-xs text-dark/60">
          For security, this code will expire automatically
        </p>
      </div>

      {/* Back Button */}
      <div className="text-center">
        <button
          onClick={() => toggleScreens("")}
          className="inline-flex items-center text-sm font-medium text-dark/70 hover:text-dark bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors"
          disabled={loading}
        >
          <span className="mr-1">←</span>
          Change Phone Number
        </button>
      </div>

      <DebugComponent title="Reset Password Form" debugData={loginFormData} />
    </div>
  );
};

export default ResetPasswordCode;
