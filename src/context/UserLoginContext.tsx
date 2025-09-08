import { useState, ReactNode, useContext, createContext } from "react";
import { toast } from "sonner";
import useAuthStore from "@/store/UseAuthStore";
import useAuthQueries from "@/hooks/useAuthQueries";
import {
  LoginForm,
  EmailField,
  LoginFields,
  ProfileField,
  initialVerifyOtp,
  initialLoginData,
  initialEmailField,
  initialProfileField,
  UserLoginContextType,
  initialLoginFormValidations,
  initialProfileValidationFields,
} from "@/types/AuthTypes";
import { useNavigate } from "react-router-dom";

export const UserLoginContext = createContext({} as UserLoginContextType);

const initialLoginValidation: LoginFields = {
  phone: "",
  password: "",
};

const initialEmailValidation: EmailField = {
  email: "",
};

export const UserLoginProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user, setToken, setProfile } = useAuthStore();
  const userId = user?.id;
  const [showOtpCodeInput, setShowOtpCodeInput] = useState(false);
  const [profileData, setProfileData] = useState(initialProfileField);
  const [loginFormData, setLoginFormData] = useState(initialLoginData);
  const [verifyOtpData, setVerifyOtpData] = useState(initialVerifyOtp);
  const [emailPasswordReset, setEmailPasswordReset] =
    useState(initialEmailField);
  const [loginFormValidationErrors, setLoginFormValidationErrors] = useState(
    initialLoginFormValidations
  );
  const [profileValidationErrors, setProfileValidationErrors] = useState(
    initialProfileValidationFields
  );
  const [loginErrors, setLoginErrors] = useState(initialLoginValidation);
  const [resetEmailErrors, setResetEmailErrors] = useState(
    initialEmailValidation
  );
  const [isOtpValid, setIsOtpValid] = useState(false);

  const handleShowOtpCodeInput = () => setShowOtpCodeInput((prev) => !prev);

  const handleValidateProfileForm = () => {
    let errors: ProfileField = { ...profileValidationErrors };

    // Validate first_name
    if (!profileData.first_name) {
      errors.first_name = "First name is required";
    } else if (profileData.first_name.length < 2) {
      errors.first_name = "First name must be at least 2 characters";
    } else {
      errors.first_name = "";
    }

    // Validate middle_name
    if (!profileData.middle_name) {
      errors.middle_name = "Middle name is required";
    } else if (profileData.middle_name.length < 2) {
      errors.middle_name = "Middle name must be at least 2 characters";
    } else {
      errors.middle_name = "";
    }

    // Validate last_name
    if (!profileData.last_name) {
      errors.last_name = "Last name is required";
    } else if (profileData.last_name.length < 2) {
      errors.last_name = "Last name must be at least 2 characters";
    } else {
      errors.last_name = "";
    }

    // Validate address
    if (!profileData.address) {
      errors.address = "Address is required";
    } else if (profileData.address.length < 5) {
      errors.address = "Address must be at least 5 characters";
    } else {
      errors.address = "";
    }

    // Validate dob (date of birth)
    if (!profileData.dob) {
      errors.dob = "Date of birth is required";
    } else if (new Date(profileData.dob) > new Date()) {
      errors.dob = "Date of birth cannot be in the future";
    } else {
      // Calculate age
      const dob = new Date(profileData.dob);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();

      // Adjust age if the birthday hasn't occurred yet this year
      const monthDifference = today.getMonth() - dob.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < dob.getDate())
      ) {
        age--;
      }

      // Check if the user is at least 18 years old
      if (age < 18) {
        errors.dob = "You must be at least 18 years old";
      } else {
        errors.dob = "";
      }
    }

    // Validate passport_image
    if (!profileData.passport_image) {
      errors.passport_image = "Passport image is required";
    } else {
      errors.passport_image = "";
    }

    // Validate gender
    if (!profileData.gender) {
      errors.gender = "Gender is required";
    } else if (
      !["male", "female", "other"].includes(profileData.gender.toLowerCase())
    ) {
      errors.gender = "Gender must be male, female, or other";
    } else {
      errors.gender = "";
    }

    // Validate years_of_employment
    if (!profileData.years_of_employment) {
      errors.years_of_employment = "Years of employment is required";
    } else if (isNaN(Number(profileData.years_of_employment))) {
      errors.years_of_employment = "Years of employment must be a number";
    } else {
      errors.years_of_employment = "";
    }

    // Validate salary
    if (!profileData.salary) {
      errors.salary = "Salary is required";
    } else if (isNaN(Number(profileData.salary))) {
      errors.salary = "Salary must be a number";
    } else if (Number(profileData.salary) < 0) {
      errors.salary = "Salary cannot be negative";
    } else {
      errors.salary = 0;
    }

    setProfileValidationErrors(errors);

    return Object.values(errors).every(
      (error) => error === "" || error === null || error === 0
    );
  };

  const handleValidateLoginForm = () => {
    let errors: LoginForm = { ...loginFormValidationErrors };

    if (!loginFormData.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(loginFormData.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number";
    } else {
      errors.phone = "";
    }

    setLoginFormValidationErrors(errors);

    return Object.values(errors).every((error) => error === "");
  };

  const validateLoginForm = () => {
    let errors: LoginFields = { ...loginErrors };

    if (!loginFormData.password) {
      errors.password = "Password is required";
    } else if (loginFormData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else {
      errors.password = "";
    }

    setLoginErrors(errors);

    return Object.values(errors).every((error) => error === "");
  };

  const validateEmailField = () => {
    let errors: EmailField = { ...resetEmailErrors };

    if (!emailPasswordReset.email) {
      errors.email = "Email address is required";
    } else if (!/^\S+@\S+\.\S+$/.test(emailPasswordReset.email)) {
      errors.email = "Please enter a valid email address";
    } else {
      errors.email = "";
    }

    setResetEmailErrors(errors);

    return Object.values(errors).every((error) => error === "");
  };

  const handleVerifyUserPhone = async () => {
    if (loading) return;

    if (!handleValidateLoginForm()) {
      return toast.error("Input requires your attention", {
        description: "Please check the phone number input for errors",
        duration: 5000,
      });
    }

    setLoading(true);

    const { success, message } = await useAuthQueries().sendOTP(loginFormData);

    if (!success) {
      toast.error(message);
      setLoading(false);
      return;
    }

    toast.success(message);

    // Reset form data
    setLoading(false);
    handleShowOtpCodeInput();
    setLoginFormValidationErrors(initialLoginFormValidations);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleUpdateProfile = async () => {
    if (loading) return;

    // Validate profile form
    if (!handleValidateProfileForm()) {
      return toast.error("Input requires your attention", {
        description: "Please check the profile form for errors",
        duration: 5000,
      });
    }

    setLoading(true);

    try {
      if (!userId) {
        console.log("User ID is missing");
        setLoading(false);
        return;
      }

      const { success, message, data } =
        await useAuthQueries().updateUserProfile(userId, profileData);

      if (!success) {
        toast.error(message);
        setLoading(false);
        return;
      }

      setProfile(data);
      setToken(data.token);
      toast.success(message);
      setProfileData(initialProfileField);
      setProfileValidationErrors(initialProfileValidationFields);
    } catch (error) {
      toast.error("An error occurred while updating the profile");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProfileImage = () => {
    setProfileData({
      ...profileData,
      passport_image: "",
    });
  };

  const handleLoginUser = async () => {
    if (loading) return;

    if (!validateLoginForm() && !handleValidateLoginForm()) {
      return toast.error("Input requires your attention", {
        description: "Please check the login form for errors",
        duration: 5000,
      });
    }

    setLoading(true);

    const loginData = {
      phone_number: loginFormData.phone,
      password: loginFormData.password || "",
    };

    try {
      const { success, message, data } = await useAuthQueries().loginUser(
        loginData
      );

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
      } else {
        setProfile(newData);
        navigate("/auth-validate-profile");
      }
      toast.success(message);
    } catch (error) {
      toast.error("An error occurred while logging in");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEmailPasswordReset({
      ...emailPasswordReset,
      [name]: value,
    });
  };

  const handleSendResetPasswordOtp = async (toggleClose: () => void) => {
    if (loading) return;

    if (!validateEmailField()) {
      return toast.error("Input requires your attention", {
        description: "Please check the email input for errors",
        duration: 5000,
      });
    }

    setLoading(true);

    const emailData = {
      email: emailPasswordReset.email,
    };

    try {
      const { success, message, data } =
        await useAuthQueries().sendPasswordResetCode(emailData);

      if (!success) {
        toast.error(message);
        setLoading(false);
        return;
      }

      toggleClose();
      toast.success(message);
      setVerifyOtpData({
        ...verifyOtpData,
        email: data.email,
      });
    } catch (error) {
      toast.error("An error occurred while sending the reset password OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setVerifyOtpData({
        ...verifyOtpData,
        code: value,
      });
      setIsOtpValid(value.length === 6);
    }
  };

  const handleVerifyOtp = async (toggleClose: () => void) => {
    if (loading) return;

    if (!isOtpValid) {
      return toast.error("Invalid OTP code");
    }

    setLoading(true);

    try {
      const { success, message } = await useAuthQueries().verifyOTPCode(
        verifyOtpData
      );

      if (!success) {
        toast.error(message);
        setLoading(false);
        return;
      }

      toggleClose();
      toast.success("Verification Successful!", {
        description: message,
        duration: 5000,
      });
      navigate("/change-password?email=" + verifyOtpData.email);
    } catch (error) {
      toast.error("An error occurred while verifying the OTP");
    } finally {
      setLoading(false);
    }
  };

  const value = {
    loading,
    isOtpValid,
    loginErrors,
    profileData,
    loginFormData,
    verifyOtpData,
    setProfileData,
    handleVerifyOtp,
    handleOtpChange,
    handleLoginUser,
    setVerifyOtpData,
    setLoginFormData,
    showOtpCodeInput,
    handleInputChange,
    emailPasswordReset,
    handleUpdateProfile,
    setShowOtpCodeInput,
    handleVerifyUserPhone,
    handleEmailInputChange,
    handleShowOtpCodeInput,
    profileValidationErrors,
    handleRemoveProfileImage,
    handleProfileInputChange,
    loginFormValidationErrors,
    handleSendResetPasswordOtp,
  };

  return (
    <UserLoginContext.Provider value={value}>
      {children}
    </UserLoginContext.Provider>
  );
};

export const useLogin = (): UserLoginContextType => {
  const context = useContext(UserLoginContext);
  if (!context) {
    throw new Error("useLogin must be used within an UserLoginProvider");
  }
  return context;
};
