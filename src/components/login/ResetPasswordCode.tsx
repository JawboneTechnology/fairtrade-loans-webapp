import { toast } from "sonner";
import { RiLock2Fill } from "react-icons/ri";
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
  const buttonClass = `${
    disabled
      ? "bg-primary/50 cursor-not-allowed"
      : "bg-primary hover:bg-primary-slight"
  } text-white rounded-md mt-3 w-full`;

  return (
    <div className="bg-light p-5 pb-10 rounded-md border border-primary/50">
      <div className="text-lg font-semibold mb-3">Confirm OTP Code</div>

      <p className="text-dark2">
        Enter the 6-digit code sent to your email address to reset your
        password.
      </p>

      <div className="flex justify-center gap-3 sm:gap-5 mt-5">
        {/* Reset Code Inputs */}
        {resetCode.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            className="w-12 h-12 text-center border focus:outline-primary border-gray rounded-md text-2xl text-primary"
          />
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-5">
        <UniversalButton
          title={loading ? "Loading..." : "Validate & Login"}
          className={buttonClass}
          handleClick={handleSendResetCode}
          icon={<RiLock2Fill />}
          disabled={disabled}
        />
      </div>

      <DebugComponent title="Reset Password Form" debugData={loginFormData} />
    </div>
  );
};

export default ResetPasswordCode;
