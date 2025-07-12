import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Still useful for sending cookies if needed
});

// Attach token from localStorage in every request
api.interceptors.request.use((config) => {
  const userToken = localStorage.getItem('token');
  const adminToken = localStorage.getItem('admin_token');

  const token = adminToken || userToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
