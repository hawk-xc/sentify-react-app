// src/api/axiosClient.js
import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ENDPOINT || "http://localhost:8080/dev",
});

axiosClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
