import axiosClient from "@/axiosClient";

interface UploadResponse {
    success: boolean;
    message: string;
    data?: any;
}

const useNotificationsQueries = () => { 
    // Get Loan Types
    async function getNotifications(): Promise<UploadResponse> {
        try {
        const response = await axiosClient.get("notifications");

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

    // Respond to loan request
    async function respondToRequest(guarantorId: string, responseData: {
        response: string,
        reason: string,
        loan_id: string,
        notification_id: string,
      }): Promise<UploadResponse> {
        try {
            const response = await axiosClient.post(`guarantor/${guarantorId}/respond`, responseData);

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

    return {
        respondToRequest,
        getNotifications,
    }
};

export default useNotificationsQueries;