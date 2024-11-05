import axios from "axios";

// Create an Axios instance with default configurations
const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the JWT token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      // Check if running in the browser
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
