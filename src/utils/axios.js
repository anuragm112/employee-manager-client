import axios from "axios";

// Base URL of the backend API
const API_URL = "http://localhost:7000";  // Update this with your backend URL

// Create an instance of axios with baseURL and headers
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Interceptor for request - adding Authorization header if token exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for response - handling errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Token expired or not authorized, alert user and redirect to login
        alert("Session expired. Please log in again.");
        window.location.href = "/login";
      } else if (error.response.status >= 500) {
        // Handle server errors (e.g., show a message)
        alert("Server error. Please try again later.");
      }
    } else {
      // Handle network or other unexpected errors
      alert("Network error. Please check your connection.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
