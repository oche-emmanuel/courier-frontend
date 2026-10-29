import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || '';

const api = axios.create({
    baseURL: apiUrl + '/api',
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        if (import.meta.env.PROD && !apiUrl) {
            return Promise.reject(new Error('Backend API URL is not configured. Set VITE_API_URL in the frontend deployment.'));
        }

        const adminData = localStorage.getItem('adminInfo');
        if (adminData) {
            const { token } = JSON.parse(adminData);
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
