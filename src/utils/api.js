import axios from 'axios';
import { getToken, clearAuth } from './storage';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth();
    }
    return Promise.reject(error);
  }
);

export async function login(credentials) {
  const { data } = await api.post('/auth/login', credentials);
  return data;
}

export async function signup(payload) {
  const { data } = await api.post('/auth/signup', payload);
  return data;
}

export async function fetchDashboardStats() {
  const { data } = await api.get('/dashboard/stats');
  return data;
}

export async function fetchInterviewHistory() {
  const { data } = await api.get('/interviews/history');
  return data;
}
