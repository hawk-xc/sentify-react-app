// src/api/axiosClient.js
import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: "https://perceivo-backend-api-132823030367.asia-southeast2.run.app/1.0.0-latest", // URL backend Anda
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
