import axiosClient from '../axiosClient';

export interface OrganizationAccountRequest {
    orgName: string;
    contactPerson: string;
    email: string;
    phone: string;
    employees: number;
    notes?: string;
}

export interface OrganizationAccountResponse {
    success: boolean;
    message: string;
    data?: {
        organization_id: string;
        name: string;
        status: string;
        contact_person: string;
        email: string;
    };
    error?: string;
}

export interface OrganizationVerificationResponse {
    success: boolean;
    message: string;
    data?: {
        organization_id: string;
        name: string;
        verified_at: string;
    };
    error?: string;
}

export const organizationAccountService = {
    /**
     * Submit organization account request
     */
    async submitRequest(data: OrganizationAccountRequest): Promise<OrganizationAccountResponse> {
        try {
            const response = await axiosClient.post('/organization/request-account', data);
            return response.data;
        } catch (error: any) {
            console.error('Organization account request error:', error);

            if (error.response?.data) {
                return error.response.data;
            }

            return {
                success: false,
                message: 'Network error. Please check your connection and try again.',
                error: error.message || 'Unknown error occurred'
            };
        }
    },

    /**
     * Verify organization email
     */
    async verifyEmail(token: string): Promise<OrganizationVerificationResponse> {
        try {
            const response = await axiosClient.post(`/organization/verify-email/${token}`);
            return response.data;
        } catch (error: any) {
            console.error('Email verification error:', error);

            if (error.response?.data) {
                return error.response.data;
            }

            return {
                success: false,
                message: 'Network error. Please check your connection and try again.',
                error: error.message || 'Unknown error occurred'
            };
        }
    },

    /**
     * Get organization details
     */
    async getOrganization(id: string) {
        try {
            const response = await axiosClient.get(`/organization/${id}`);
            return response.data;
        } catch (error: any) {
            console.error('Get organization error:', error);

            if (error.response?.data) {
                return error.response.data;
            }

            return {
                success: false,
                message: 'Failed to fetch organization details.',
                error: error.message || 'Unknown error occurred'
            };
        }
    },
};