import axios from "axios";
import { tokenManager } from "./token";
import { refreshToken } from "./refresh";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor: attach token
API.interceptors.request.use((config: any) => {
  const token = tokenManager.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: handle expired token
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Refresh token
      await refreshToken();

      // Retry original request
      const token = tokenManager.getToken();
      if (token) originalRequest.headers.Authorization = `Bearer ${token}`;
      return API(originalRequest);
    }

    return Promise.reject(error);
  },
);

export default API;
