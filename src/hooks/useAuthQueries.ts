import axiosClient from "@/axiosClient";
import { LoginForm, VerifyOtp, ProfileField } from "@/types/AuthTypes";

interface UploadResponse {
  success: boolean;
  message: string;
  data?: any;
}

const useAuthQueries = () => {
    // Validate User Phone Number & Send OTP
    async function sendOTP(formData: LoginForm): Promise<UploadResponse> {
        try {
        const response = await axiosClient.post("user-otp-auth", formData);

        const { success, message, data } = response.data;

        return {
            success,
            message,
            data,
        };
        } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message || "An error occurred while sending the OTP",
        };
        }
    }

    // Confirm OTP Code
    async function confirmOTPCode(formData: LoginForm): Promise<UploadResponse> {
        try {
        const response = await axiosClient.post("phone-number-auth", formData);

            const { success, message, data } = response.data;
            
            return {
                success,
                message,
                data,
            };
        } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message || "An error occurred while confirming the OTP",
        };
        }
    }

    // Update user profile
    async function updateUserProfile(userId: string, formData: ProfileField): Promise<UploadResponse> {
        try {
            const response = await axiosClient.patch(`user-profile/${userId}/update`, formData);

            const { success, message, data } = response.data;

            return {
                success,
                message,
                data,
            };
            } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || "An error occurred while updating the user profile",
            };
        }
    }

    // Handle get user profile
    async function getUserProfile(): Promise<UploadResponse> {
        try {
            const response = await axiosClient.get(`profile`);

            const { success, message, data } = response.data;

            return {
                success,
                message,
                data,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || "An error occurred while retrieving the user profile",
            };
        }
    }

    // Handle delete user profile
    async function deleteUserProfile(reason: string): Promise<UploadResponse> {
        try {
            const response = await axiosClient.delete(`user-profile/delete`, { data: { reason } });

            const { success, message, data } = response.data;

            return {
                success,
                message,
                data,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || "An error occurred while deleting the user profile",
            };
        }
    }

    // Handle reset password
    async function resetPassword(passwordData: { password: string, old_password: string, otp_code: string}): Promise<UploadResponse> {
        try {
            const response = await axiosClient.patch("change-password-internal", passwordData);

            const { success, message, data } = response.data;

            return {
                success,
                message,
                data,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || "An error occurred while resetting the password",
            };
        }
    }

    // Handle login user
    async function loginUser(loginData: { phone_number: string, password: string }): Promise<UploadResponse> {
        try {
            const response = await axiosClient.post("login-user", loginData);

            const { success, message, data } = response.data;

            return {
                success,
                message,
                data,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || "An error occurred while logging in",
            };
        }
    }

    // Handle send password reset code
    async function sendPasswordResetCode(emailData: { email: string }): Promise<UploadResponse> {
        try {
            const response = await axiosClient.post("forgot-password", emailData);

            const { success, message, data } = response.data;

            return {
                success,
                message,
                data,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || "An error occurred while sending the password reset code",
            };
        }
    }

    // Verify OTP Code
    async function verifyOTPCode(otpData: VerifyOtp): Promise<UploadResponse> { 
        try {
            const response = await axiosClient.get("verify-reset-password-external", { params: otpData });

            const { success, message, data } = response.data;

            return {
                success,
                message,
                data,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || "An error occurred while verifying the OTP code",
            };
        }
    }

    // Change password external
    async function changePasswordExternal(passwordData: { email: string, password: string }): Promise<UploadResponse> {
        try {
            const response = await axiosClient.patch("change-password", passwordData);

            const { success, message, data } = response.data;

            return {
                success,
                message,
                data,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || "An error occurred while changing the password",
            };
        }
    }

    return {
        sendOTP,
        loginUser,
        verifyOTPCode,
        resetPassword,
        getUserProfile,
        confirmOTPCode,
        deleteUserProfile,
        updateUserProfile,
        sendPasswordResetCode,
        changePasswordExternal,
    };
};

export default useAuthQueries;
