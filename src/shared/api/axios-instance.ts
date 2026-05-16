import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.warn('VITE_API_URL is not defined in environment variables');
}

export const apiClient = axios.create({
  baseURL: API_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      console.error('Resource not found');
    } else if (error.response?.status >= 500) {
      console.error('Server error occurred');
    }
    return Promise.reject(error);
  }
);
