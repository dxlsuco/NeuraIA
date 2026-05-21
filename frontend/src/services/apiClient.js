import axios from 'axios';

import { clearStoredSession, getStoredToken, notifySessionExpired } from './authStorage';
import { toast } from '../utils/toast';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const skipGlobalErrorToast = error?.config?.skipGlobalErrorToast;

    if (!error?.response) {
      if (!skipGlobalErrorToast) {
        toast.error('Não foi possível ligar ao servidor. Verifica a ligação e tenta novamente.');
      }
      return Promise.reject(error);
    }

    if (status === 401) {
      clearStoredSession();
      notifySessionExpired();
    }

    if (status >= 500) {
      const message = error?.response?.data?.message ?? 'Erro interno do servidor. Tenta novamente mais tarde.';
      if (!skipGlobalErrorToast) {
        toast.error(message);
      }
      return Promise.reject(new Error(message, { cause: error }));
    }

    return Promise.reject(error);
  },
);

export default apiClient;
