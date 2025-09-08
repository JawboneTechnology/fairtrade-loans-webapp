import { useState, ReactNode, useContext, createContext } from "react";
import useAuthQueries from "@/hooks/useAuthQueries";
import useAuthStore from "@/store/UseAuthStore";
import { toast } from "sonner";

interface PasswordChangeContextProps {
  loadingPasswordChange: boolean;
  oldPassword: string;
  setOldPassword: (value: string) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  showOldPassword: boolean;
  setShowOldPassword: (value: boolean) => void;
  showNewPassword: boolean;
  setShowNewPassword: (value: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (value: boolean) => void;
  showOtpModal: boolean;
  setShowOtpModal: (value: boolean) => void;
  otp: string;
  setOtp: (value: string) => void;
  isOtpValid: boolean;
  passwordRequirements: { label: string; check: boolean }[];
  isPasswordValid: boolean;
  doPasswordsMatch: boolean;
  passwordStrength: number;
  handleOtpChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOtpSubmit: () => void;
  handleSendResetCode: () => void;
  handleResetPassword: () => void;
  passwordChange: PasswordChange;
  setPasswordChange: React.Dispatch<React.SetStateAction<PasswordChange>>;
}

export interface PasswordChange {
  old_password?: string;
  new_password: string;
  confirm_password?: string;
  otp: string;
}

export const PasswordChangeContext = createContext<PasswordChangeContextProps>(
  {} as PasswordChangeContextProps
);

const initialPasswordChange: PasswordChange = {
  old_password: "",
  new_password: "",
  confirm_password: "",
  otp: "",
};

export const PasswordChangeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user, logout } = useAuthStore();
  const userPhone = user?.phone_number;
  const [loadingPasswordChange, setLoadingPasswordChange] = useState(false);
  const [passwordChange, setPasswordChange] = useState<PasswordChange>(
    initialPasswordChange
  );
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(false);

  // Password validation rules
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
  const doPasswordsMatch =
    newPassword === confirmPassword && newPassword !== "";

  const passwordStrength =
    (passwordRequirements.filter((req) => req.check).length /
      passwordRequirements.length) *
    100;

  // Handle OTP input change
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setOtp(value);
      setIsOtpValid(value.length === 6);
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = async () => {
    if (!isOtpValid) return;

    setLoadingPasswordChange(true);
    const { success, message } = await useAuthQueries().confirmOTPCode({
      phone: userPhone as string,
      otp_code: otp,
    });

    if (!success) {
      toast.error(message);
      setLoadingPasswordChange(false);
      return;
    }

    // If OTP is valid, proceed to reset password
    await handleResetPassword();
    setLoadingPasswordChange(false);
  };

  // Handle Reset password
  const handleResetPassword = async () => {
    if (!isPasswordValid || !doPasswordsMatch) return;

    const { success, message } = await useAuthQueries().resetPassword({
      old_password: oldPassword,
      password: newPassword,
      otp_code: otp,
    });

    if (!success) {
      toast.error(message);
      return;
    }

    toast.success(message);
    setShowOtpModal(false);
    setPasswordChange(initialPasswordChange);

    setTimeout(() => {
      logout();
    }, 2000);
  };

  // Handle Send OTP to user
  const handleSendResetCode = async () => {
    if (loadingPasswordChange) return;

    if (!userPhone) {
      toast.error("User phone number is missing.");
      return;
    }

    setLoadingPasswordChange(true);
    const { success, message } = await useAuthQueries().sendOTP({
      phone: userPhone,
    });

    if (!success) {
      toast.error(message);
      setLoadingPasswordChange(false);
      return;
    }

    toast.success(message);
    setShowOtpModal(true); // Show OTP modal after sending OTP
    setLoadingPasswordChange(false);
  };

  const values = {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    showOldPassword,
    setShowOldPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    showOtpModal,
    setShowOtpModal,
    otp,
    setOtp,
    isOtpValid,
    passwordRequirements,
    isPasswordValid,
    doPasswordsMatch,
    passwordStrength,
    handleOtpChange,
    handleOtpSubmit,
    handleSendResetCode,
    handleResetPassword,
    loadingPasswordChange,
    passwordChange,
    setPasswordChange,
  };

  return (
    <PasswordChangeContext.Provider value={values}>
      {children}
    </PasswordChangeContext.Provider>
  );
};

export const usePasswordChange = (): PasswordChangeContextProps => {
  const context = useContext(PasswordChangeContext);
  if (!context) {
    throw new Error(
      "usePasswordChange must be used within a PasswordChangeProvider"
    );
  }
  return context;
};
