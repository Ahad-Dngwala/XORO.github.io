import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout. Please check your connection.';
    } else if (error.code === 'ERR_NETWORK') {
      error.message = 'Network error. Please ensure the backend server is running.';
    } else if (!error.response) {
      error.message = 'Unable to reach server. Please check your connection.';
    }
    return Promise.reject(error);
  }
);

export const taskService = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await api.get('/tasks');
      return response.data.data || [];
    } catch (error) {
      console.error('API Error (getAllTasks):', error);
      throw error;
    }
  },

  // Get task by ID
  getTaskById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data.data;
  },

  // Create task
  createTask: async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data.data;
    } catch (error) {
      console.error('API Error (createTask):', error);
      throw error;
    }
  },

  // Update task
  updateTask: async (id, taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      return response.data.data;
    } catch (error) {
      console.error('API Error (updateTask):', error);
      throw error;
    }
  },

  // Delete task
  deleteTask: async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      return id;
    } catch (error) {
      console.error('API Error (deleteTask):', error);
      throw error;
    }
  },
};

export default api;

