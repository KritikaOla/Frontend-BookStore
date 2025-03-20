import axios from 'axios';

const API_BASE_URL = 'http://localhost:5197/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach token to headers automatically if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
