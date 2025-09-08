import axiosClient from "@/axiosClient";
import { Dependent } from "@/context/DependentContext";

interface Response {
    success: boolean;
    message: string;
    data?: any;
}

const useDependentQueries = () => { 
    // Get Loan Types
    async function getUserDependents(): Promise<Response> {
        try {
        const response = await axiosClient.get("my-dependents");

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

    // Delete user dependent
    async function deleteUserDependent(dependentId: string): Promise<Response> { 
        try {
            const response = await axiosClient.delete(`dependents/${dependentId}`);

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

    // Update user dependent
    async function updateUserDependent(dependentId: string, dependantData: Dependent): Promise<Response> { 
        try {
            const response = await axiosClient.patch(`dependents/${dependentId}`, dependantData);

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

    // Create user dependent
    async function createUserDependent(dependentData: { user_id: string, dependants: Dependent[]}): Promise<Response> { 
        try {
            const response = await axiosClient.post("dependents", dependentData);

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
        getUserDependents,
        deleteUserDependent,
        updateUserDependent,
        createUserDependent,
    }
};

export default useDependentQueries;