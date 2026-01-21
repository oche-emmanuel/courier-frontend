import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
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
