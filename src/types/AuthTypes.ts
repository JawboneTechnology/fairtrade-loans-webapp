import {Dispatch, SetStateAction} from "react";

export interface Plan {
    _id: string;
    name: string;
}

export interface User {
    id: string;
    first_name: string,
    middle_name: string,
    last_name: string,
    address: string,
    dob: Date,
    gender: string,
    passport: string,
    phone_number: string,
    passport_image: string,
    years_of_employment: string,
    salary: string | number,
}

export interface Role {
    _id: number | string;
    name: string;
    description: string;
    permissions: PermissionsType[];
    createdAt: string;
}

export interface NewUser {
    firstname: string;
    lastname: string;
    email: string;
}
  
export type PermissionsType = {
    _id: string;
    name: string;
};

export interface AuthState {
    user: User | null;
    logout: () => void;
    token: string | null;
    profile: string | null;
    setToken: (token: string) => void | null;
    setProfile: (profile: ProfileField) => void | null;
    login: (user: User, token: string) => void;
}

export interface UserLoginContextType {
  loading: boolean;
  isOtpValid: boolean;
  loginErrors: LoginFields;
  loginFormData: LoginForm;
  verifyOtpData: VerifyOtp;
  showOtpCodeInput: boolean;
  profileData: ProfileField;
  handleLoginUser: () => void;
  emailPasswordReset: EmailField;
  handleUpdateProfile: () => void;
  handleVerifyUserPhone: () => void;
  handleShowOtpCodeInput: () => void;
  loginFormValidationErrors: LoginForm;
  handleRemoveProfileImage: () => void;
  profileValidationErrors: ProfileField;
  handleVerifyOtp: (fn: () => void) => void;
  handleSendResetPasswordOtp: (fn: () => void) => void;
  setVerifyOtpData: Dispatch<SetStateAction<VerifyOtp>>;
  setProfileData: Dispatch<SetStateAction<ProfileField>>;
  setLoginFormData: Dispatch<SetStateAction<LoginForm>>;
  setShowOtpCodeInput: Dispatch<SetStateAction<boolean>>;
  handleOtpChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleProfileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface VerifyOtp { 
  email: string;
  code: string;
}

export interface LoginFields {
  phone: string;
  password: string;
}

export interface LoginForm {
  phone: string;
  otp_code?: string;
  password?: string;
}

export interface ProfileField {
  first_name: string;
  middle_name: string | null;
  last_name: string;
  address: string;
  phone_number?: string;
  email?: string;
  dob: Date | string;
  passport_image: string;
  gender: string;
  years_of_employment: string;
  salary: number | string;
}

export interface EmailField {
  email: string;
}

export const initialLoginData: LoginForm = {
  phone: "",
  otp_code: "",
  password: "",
};

export const initialLoginFormValidations: LoginForm = {
  phone: "",
  otp_code: "",
};

export const initialProfileField: ProfileField = {
  first_name: "",
  middle_name: null,
  last_name: "",
  address: "",
  dob: new Date(),
  passport_image: "",
  gender: "",
  years_of_employment: "",
  salary: 0,
};

export const initialProfileValidationFields: ProfileField = {
  first_name: "",
  middle_name: "",
  last_name: "",
  address: "",
  dob: "",
  passport_image: "",
  gender: "",
  years_of_employment: "",
  salary: "",
};

export const initialEmailField: EmailField = {
  email: "",
};

export const initialVerifyOtp: VerifyOtp = {
  email: "",
  code: "",
}