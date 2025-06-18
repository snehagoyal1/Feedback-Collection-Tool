import axios from "axios";
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });
export const loginAdmin = (data) => API.post("/api/auth/login", data);
export const submitFeedback = (data) => API.post("/api/feedback/submit", data);
export const getFeedbacks = (token) => API.get("/api/feedback/all", { headers: { Authorization: `Bearer ${token}` } });
export const getStats = (token) => API.get("/api/feedback/stats", { headers: { Authorization: `Bearer ${token}` } });
