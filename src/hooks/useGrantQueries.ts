import axiosClient from "@/axiosClient";
import { ApplyGrant } from "@/context/GrantsContext";

interface Response {
    success: boolean;
    message: string;
    data?: any;
}

const useGrantQueries = () => { 
    // Get Loan Types
    async function getUserGrants(): Promise<Response> {
        try {
        const response = await axiosClient.get("my-grants");

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

    // Add user grant
    async function addGrant(grant: ApplyGrant): Promise<Response> { 
        try {
            const response = await axiosClient.post("grants", grant);

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

    // Delete user grant
    async function deleteUserGrant(grantId: string, force: boolean): Promise<Response> { 
        try {
            const response = await axiosClient.delete(`grants/${grantId}/delete?force=${force}`);

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

    // Update user grant
    async function updateUserGrant(grantId: string, grantData: ApplyGrant): Promise<Response> { 
        try {
            const response = await axiosClient.patch(`grants/${grantId}/update`, grantData);

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

    // Fetch grant types
    async function getGrantTypes(): Promise<Response> {
        try {
            const response = await axiosClient.get("grant-types-options");

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

    // Cancel grant application
    async function cancelGrantApplication(grantId: string): Promise<Response> {
        try {
            const response = await axiosClient.post(`grants/${grantId}/cancel`);

            const { success, message, data } = response.data;
            
            return {
                success,
                message,
                data,
            };
        }
        catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || "An error occurred while confirming the OTP",
            };
        }
    }
    
    // Get single grant details
    async function getSingleGrant(grantId: string): Promise<Response> { 
        try {
            const response = await axiosClient.get(`grants/${grantId}`);

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
        addGrant,
        getGrantTypes,
        getUserGrants,
        getSingleGrant,
        deleteUserGrant,
        updateUserGrant,
        cancelGrantApplication,
    }
};

export default useGrantQueries;