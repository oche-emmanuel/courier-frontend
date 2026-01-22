import axios from 'axios';

const api = axios.create({
    baseURL: (import.meta.env.VITE_API_URL || '') + '/api',
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
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
