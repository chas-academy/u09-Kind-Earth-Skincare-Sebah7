import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://u09-kind-earth-skincare-sebah7-4.onrender.com/api",
  // "http://localhost:3000/api",
});

const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
