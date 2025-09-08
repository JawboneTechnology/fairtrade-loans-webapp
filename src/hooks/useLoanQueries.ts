import axiosClient from "@/axiosClient";

interface UploadResponse {
    success: boolean;
    message: string;
    data?: any;
}

const useLoanQueries = () => { 
    // Get Loan Types
    async function getLoanTypes(): Promise<UploadResponse> {
        try {
        const response = await axiosClient.get("loan-types");

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

    // Get User Loan Limit
    async function getUserLoanLimit(userId: string): Promise<UploadResponse> {
        try {
        const response = await axiosClient.get(`employees/${userId}/loan-limit`);

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

    // Get and search guarantors
    async function getGuarantors(offset: string, limit: string): Promise<UploadResponse> {
        try {
        const response = await axiosClient.get(`user/search?offset=${offset}&limit=${limit}`);

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

    // Apply for a loan
    async function applyLoan(userId: string, loanApplication: any): Promise<UploadResponse> {
        try {
        const response = await axiosClient.post(`employees/${userId}/loans`, loanApplication);

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

    // Get guarantor search
    async function getGuarantorSearch(searchQuery: string, offset: string, limit: string): Promise<UploadResponse> {
        try {
        const response = await axiosClient.get(`user/search?query=${searchQuery}&offset=${offset}&limit=${limit}`);

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

    // Get loan statistics
    async function getLoanStatistics(): Promise<UploadResponse> { 
        try {
        const response = await axiosClient.get("loan-statistics");

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
        applyLoan,
        getLoanTypes,
        getGuarantors,
        getUserLoanLimit,
        getLoanStatistics,
        getGuarantorSearch,
    }
};

export default useLoanQueries;