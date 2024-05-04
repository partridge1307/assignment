import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.response.use((res) => res, rotateTokenHandler)

async function rotateTokenHandler(error: AxiosError) {
  const originalRequest = error.config;

  if (originalRequest?.url === "/auth/session" && error.response?.status === 401) {
    try {
      await api.post("/auth/refresh");
      return api(originalRequest);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return Promise.reject(error);
}

export default api;
