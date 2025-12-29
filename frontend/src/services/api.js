import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const grievanceAPI = {
  // Create new grievance
  createGrievance: (grievanceData) =>
    api.post("/api/v1/grievances/", grievanceData),

  // Get all grievances
  getGrievances: () => api.get("/api/v1/grievances/"),

  // Get specific grievance
  getGrievance: (id) => api.get(`/api/v1/grievances/${id}`),
};

export const analyticsAPI = {
  // Get dashboard statistics
  getDashboardStats: () => api.get("/api/v1/analytics/dashboard"),
};

export default api;
