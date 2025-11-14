import axiosClient from "@/axiosClient";
import { FormData } from "@/context/UserRegisterContext";

type ImageResponseBody = {
  success: boolean;
  message: string;
  data: {
    url: string;
  };
};

const useServerSideQueries = () => {
  // Upload image
  async function uploadImages(
    formData: FormData,
    setProgress: (progress: number) => void
  ): Promise<ImageResponseBody> {
    try {
      const response = await axiosClient.post("/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        },
      });

      const { success, message, data } = response.data;

      return {
        success,
        message,
        data,
      };

    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || "An error occurred while uploading the image",
        data: { url: "" },
      };
    }
  }

  // Get Recent Loan Information
  async function getRecentLoanInformation(): Promise<any> {
    try {
      const response = await axiosClient.get("loan/user/recent");

      const { success, message, data } = response.data;

      if (success) {
        return {
          success,
          message,
          data,
        };
      }

      return {
        success: false,
        message,
        data: {},
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || "An error occurred while fetching recent loan information",
        data: {},
      };
    }
  }

  // Get Loan Ministatement
  async function getLoanMiniStatement(loanId: string, emailData: { send_email: boolean }): Promise<any> {
    try {
      const response = await axiosClient.get(`loans/${loanId}/mini-statement?email=${emailData.send_email}`);

      const { success, message, data } = response.data;

      if (success) {
        return {
          success,
          message,
          data,
        };
      }

      return {
        success: false,
        message,
        data: {},
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || "An error occurred while fetching loan ministatement",
        data: {},
      };
    }
  }

  // Get single loan details
  async function getLoanDetails(loanId: string): Promise<any> {
    try {
      const response = await axiosClient.get(`loan-details/${loanId}`);

      const { success, message, data } = response.data;

      if (success) {
        return {
          success,
          message,
          data,
        };
      }

      return {
        success: false,
        message,
        data: {},
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || "An error occurred while fetching loan details",
        data: {},
      };
    }
  }

  // Get Loans
  async function getLoans(start: number, limit: number): Promise<any> {
    try {
      const response = await axiosClient.get(`loan/user?start=${start}&limit=${limit}`);

      const { success, message, data } = response.data;

      if (success) {
        return {
          success,
          message,
          data,
        };
      }

      return {
        success: false,
        message,
        data: [],
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || "An error occurred while fetching loans",
        data: [],
      };
    }
  }

  // Register User
  async function registerUser(formData: FormData): Promise<any> {
    try {
      const response = await axiosClient.post("register", formData);

      const { success, message, data } = response.data;

      if (success) {
        return {
          success,
          message,
          data,
        };
      }

      return {
        success: false,
        message,
        data: {},
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || "An error occurred while registering the user",
        data: {},
      };
    }
  }

  // Send Support Message
  async function sendSupportMessage(supportForm: any): Promise<any> {

    try {
      const response = await axiosClient.post("support/message", supportForm);

      const { success, message, data } = response.data;

      if (success) {
        return {
          success,
          message,
          data,
        };
      }

      return {
        success: false,
        message,
        data: {},
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || "An error occurred while sending the support message",
        data: {},
      };
    }
  }

  return {
    getLoans,
    uploadImages,
    registerUser,
    getLoanDetails,
    sendSupportMessage,
    getLoanMiniStatement,
    getRecentLoanInformation,
  };
}

export default useServerSideQueries;