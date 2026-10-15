import axios from "axios";

const API = "http://localhost:5000/api";

//AXIOS INSTANCE
const api = axios.create({
  baseURL: API,
});

//AUTO TOKEN
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//AUTH
export const signinUser = async (form) => {
  const res = await api.post("/auth/signin", form);
  return res.data;
};

export const signupUser = async (form) => {
  const res = await api.post("/auth/signup", form);
  return res.data;
};

//SHEETS
export const saveSheetLinks = async (links) => {
  const res = await api.post("/inventory/set-sheet", links);
  return res.data;
};

// DASHBOARD
export const getDashboardData = async () => {
  const res = await api.get("/dashboard");
  return res.data;
};
