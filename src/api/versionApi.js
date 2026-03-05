import { apiClient } from "./axiosClient";

export async function saveVersion(projectId, payload) {
  const response = await apiClient.post(`/version/${projectId}/`, payload);
  return response.data;
}

export async function getVersions(projectId) {
  const response = await apiClient.get(`/version/${projectId}/all`);
  return response.data;
}

export async function restoreVersion(projectId, versionId) {
  const response = await apiClient.put(`/version/${projectId}/${versionId}/restore`);
  return response.data;
}

export async function deleteVersion(projectId, versionId) {
  const response = await apiClient.delete(`/version/${projectId}/${versionId}`);
  return response.data;
}
