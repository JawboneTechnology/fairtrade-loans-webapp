import axios from "axios";
import useAuthStore from "@/store/UseAuthStore";

// Determine if the app is running in production
const baseURL = import.meta.env.VITE_FAIRTRADE_LOCAL;

// Create Axios instance
const axiosClient = axios.create({
  baseURL: baseURL,
});

// Add request interceptor
axiosClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  config.headers.Accept = "application/json";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Add response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response } = error;

    console.log("Response error:", response);

    // Throw the error if it isn't related to token expiration
    throw error;
  }
);

export default axiosClient;
