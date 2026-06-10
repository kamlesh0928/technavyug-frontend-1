import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Request failed";
    throw new Error(message);
  },
);

// AUTH
export const loginAdmin = (body) => api.post("/auth/login", body);

export const registerAdmin = (body) => api.post("/auth/register", body);

export const getMe = () => api.get("/auth/me");

export const forgotPasswordApi = (body) =>
  api.post("/auth/forgot-password", body);

export const resetPasswordApi = (token, body) =>
  api.put(`/auth/reset-password/${token}`, body);

// USERS
export const fetchUsers = (search = "") =>
  api.get(`/users?limit=200${search ? `&search=${search}` : ""}`);

export const fetchUser = (id) => api.get(`/users/${id}`);

export const createUser = (formData) => api.post("/users", formData);

export const updateUser = (id, formData) => api.put(`/users/${id}`, formData);

export const deleteUserApi = (id) => api.delete(`/users/${id}`);

// ACHIEVEMENTS
export const fetchAchievements = (search = "") =>
  api.get(`/achievements${search ? `?search=${search}` : ""}`);

export const fetchAchievement = (id) => api.get(`/achievements/${id}`);

export const createAchievement = (formData) =>
  api.post("/achievements", formData);

export const updateAchievementApi = (id, formData) =>
  api.put(`/achievements/${id}`, formData);

export const deleteAchievementApi = (id) => api.delete(`/achievements/${id}`);

// PROJECTS
export const fetchProjects = (params = "") =>
  api.get(`/projects${params ? `?${params}` : ""}`);

export const fetchProject = (id) => api.get(`/projects/${id}`);

export const createProject = (formData) => api.post("/projects", formData);

export const updateProjectApi = (id, formData) =>
  api.put(`/projects/${id}`, formData);

export const deleteProjectApi = (id) => api.delete(`/projects/${id}`);

export const duplicateProjectApi = (id) =>
  api.post(`/projects/${id}/duplicate`);

// CERTIFICATES
export const fetchCertificates = (search = "") =>
  api.get(`/certificates${search ? `?search=${search}` : ""}`);

export const fetchCertificate = (id) => api.get(`/certificates/${id}`);

export const createCertificate = (formData) =>
  api.post("/certificates", formData);

export const updateCertificateApi = (id, formData) =>
  api.put(`/certificates/${id}`, formData);

export const deleteCertificateApi = (id) => api.delete(`/certificates/${id}`);

export const verifyCertificateApi = (certId) =>
  api.get(`/certificates/verify/${certId}`);

// DASHBOARD
export const fetchDashboard = () => api.get("/dashboard");

// AUDIT LOGS
export const fetchAuditLogs = (search = "") =>
  api.get(`/audit-logs${search ? `?search=${search}` : ""}`);

// ACTIVITY
export const fetchActivity = (page = 1, limit = 10) =>
  api.get(`/activity?page=${page}&limit=${limit}`);

// ANALYTICS
export const fetchAnalytics = () => api.get("/analytics");
