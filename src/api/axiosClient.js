import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../utils/constants";

let unauthorizedHandler = null;

export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = handler;
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;
    const skipAuthRedirect = Boolean(error.config?.skipAuthRedirect);

    if (!error.response) {
      toast.error("Network error. Check your internet connection.");
      return Promise.reject(error);
    }

    if (status === 401 && !skipAuthRedirect && typeof unauthorizedHandler === "function") {
      unauthorizedHandler(error);
    }

    if (status === 403) {
      const normalized = (message || "").toLowerCase();
      const isPermissionDenied =
        normalized.includes("not allowed") || normalized.includes("not authorized");

      toast.error(message || "You are not authorized to perform this action.");

      if (isPermissionDenied && window.location.pathname !== "/unauthorized") {
        window.location.assign("/unauthorized");
      }
    }

    if (status >= 500) {
      toast.error("Server error. Please try again shortly.");
    }

    return Promise.reject(error);
  },
);
