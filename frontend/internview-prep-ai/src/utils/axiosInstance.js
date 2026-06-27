import axios from 'axios';
import {BASE_URL} from "./apiPaths";
import { toast } from 'react-hot-toast';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {        
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const url = error.config?.url || '';
        const isLoginOrRegister =
            url.includes('/auth/login') || url.includes('/auth/register');
        // Wrong password / failed login returns 401 — do not redirect away from the form
        if (error.response?.status === 401 && !isLoginOrRegister) {
            window.location.href = '/';
        } else if (error.response?.status === 500 && !isLoginOrRegister) {
            toast.error(error.response?.data?.message || 'A server error occurred. Please try again later.');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
