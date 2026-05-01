import axios from 'axios';
import { getAuth } from 'firebase/auth';

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dev.jadetimesjournals.com';
export const API_BASE_URL = `${BASE_URL}/api`;

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add a request interceptor to include the Firebase token
api.interceptors.request.use(async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.warn('API Interceptor: Proceeding without Firebase token (user is not logged in).');
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const submissionService = {
    getAll: async () => {
        const response = await api.get('/submissions');
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/submissions/${id}`);
        return response.data;
    },
    create: async (formData) => {
        // formData here is a FormData object to handle files
        const response = await api.post('/submissions', formData);
        return response.data;
    },
    updateStatus: async (id, status) => {
        const response = await api.put(`/submissions/${id}/status`, { status });
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/submissions/${id}`);
        return response.data;
    }
};

export const userService = {
    sync: async () => {
        const response = await api.post('/users/sync');
        return response.data;
    },
    getProfile: async () => {
        const response = await api.get('/users/profile');
        return response.data;
    },
    getAdmins: async () => {
        const response = await api.get('/users/admins');
        return response.data;
    },
    assignAdmin: async (data) => {
        const response = await api.post('/users/admin/assign', data);
        return response.data;
    }
};

export const journalService = {
    getAll: async () => {
        const response = await api.get('/journals');
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/journals', data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/journals/${id}`);
        return response.data;
    }
};

export default api;
