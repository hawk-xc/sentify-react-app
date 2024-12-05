// src/api/axiosClient.js
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosClient = axios.create({
  baseURL: 'http://0.0.0.0:3000/1.0.0-beta', // URL backend Anda
});

axiosClient.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
