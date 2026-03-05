import { apiClient } from "./axiosClient";

export async function getConversations(projectId) {
  const response = await apiClient.get(`/conversation/${projectId}`);
  return response.data;
}

export async function addMessage(projectId, payload) {
  const response = await apiClient.post(`/conversation/${projectId}`, payload);
  return response.data;
}
