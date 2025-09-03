import axios from 'axios';

/**
 * A pre-configured Axios instance:
 *   – Automatically adds “Authorization: Bearer <token>”
 *   – Redirects to /login on 401 (token missing / expired)
 */
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// ----- Request interceptor -----
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ----- Response interceptor -----
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // JWT invalid or expired ➜ log out
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
