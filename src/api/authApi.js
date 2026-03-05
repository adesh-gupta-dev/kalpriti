import { apiClient } from "./axiosClient";

export async function register(payload) {
  const response = await apiClient.post("/api/auth/register", payload, {
    skipAuthRedirect: true,
  });
  return response.data;
}

export async function login(payload) {
  const response = await apiClient.post("/api/auth/login", payload, {
    skipAuthRedirect: true,
  });
  return response.data;
}

export async function logout() {
  const response = await apiClient.post("/api/auth/logout");
  return response.data;
}

export async function getProfile() {
  const response = await apiClient.get("/api/auth/me", { skipAuthRedirect: true });
  return response.data;
}

export async function updateProfile(payload) {
  const response = await apiClient.put("/api/auth/update-me", payload);
  return response.data;
}

export async function changePassword(payload) {
  const response = await apiClient.put("/api/auth/me/changePassword", payload);
  return response.data;
}

export async function forgotPassword(payload) {
  const response = await apiClient.post("/api/auth/forgotPassword", payload, {
    skipAuthRedirect: true,
  });
  return response.data;
}

export async function resetPassword(resetToken, payload) {
  const response = await apiClient.put(
    `/api/auth/password/reset/${resetToken}`,
    payload,
    {
      skipAuthRedirect: true,
    },
  );
  return response.data;
}

export async function sendVerificationEmail() {
  const response = await apiClient.post("/api/auth/sendVerificationEmail");
  return response.data;
}

export async function verifyOtp(payload) {
  const response = await apiClient.post("/api/auth/verify", payload);
  return response.data;
}
