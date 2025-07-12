/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_BASE_URL = "https://shireff-nady-server.vercel.app/api";
// interface ProjectData {
//   title: string;
//   desc: string;
//   category: string;
//   img: string;
//   demo?: string;
//   git?: string;
// }
// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add language header
    const locale = localStorage.getItem("locale") || "ar";
    config.headers["Accept-Language"] = locale;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/admin";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (data: any) => api.post("/auth/login", data),
  verify: () => api.get("/auth/verify"),
};

// Products API
export const experienceAPI = {
  getExperience: () => api.get("/experiences"),
  getExperienceById: (experienceId: string) =>
    api.get(`/experiences/${experienceId}`),
  createExperience: (data: any) => api.post(`/experiences`, data),
  updateExperience: (experienceId: string) =>
    api.put(`/experiences/${experienceId}`),
  deleteExperience: (experienceId: string) =>
    api.delete(`/experiences/${experienceId}`),
};

// Categories API
export const projectsAPI = {
  getProjects: () => api.get("/projects"),
  getProjectById: (projectId: string) => api.get(`/projects/${projectId}`),
  uploadImageToCreateProject: (data: FormData) =>
    api.post(`/projects/upload-image`, data),
  createProject: (data: any) => api.post(`/projects`, data),
  updateProject: (projectId: string, data: { title: string }) =>
    api.put(`/projects/${projectId}`, data),
  deleteProject: (projectId: string) => api.delete(`/projects/${projectId}`),
};

export default api;
