import { apiClient } from "./axiosClient";

export async function createProject(payload) {
  const response = await apiClient.post("/project/create", payload);
  return response.data;
}

export async function getMyProjects() {
  const response = await apiClient.get("/project/my-projects");
  return response.data;
}

export async function getProjectById(projectId) {
  const response = await apiClient.get(`/project/${projectId}`);
  return response.data;
}

export async function editProject(projectId, payload) {
  const response = await apiClient.put(`/project/edit/${projectId}`, payload);
  return response.data;
}

export async function deleteProject(projectId) {
  const response = await apiClient.delete(`/project/${projectId}`);
  return response.data;
}

export async function updateProjectVisibility(projectId, isPublished) {
  const response = await apiClient.put(`/project/visibility/${projectId}`, {
    isPublished,
  });
  return response.data;
}

export async function getCommunityProjects() {
  const response = await apiClient.get("/project/community");
  return response.data;
}

export async function getCommunityProjectById(projectId) {
  const response = await apiClient.get(`/project/community/${projectId}`);
  return response.data;
}
