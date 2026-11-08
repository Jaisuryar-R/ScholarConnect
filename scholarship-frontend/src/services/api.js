
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Automatically attach JWT token to API requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Student APIs
export const addStudent = (data) =>
  api.post('/students', data);

export const addStudentForUser = (userId, data) =>
  api.post(`/students/user/${userId}`, data);

export const getStudentProfile = (userId) =>
  api.get(`/students/user/${userId}`);

export const updateStudentProfile = (userId, data) =>
  api.put(`/students/user/${userId}`, data);

// Scholarship APIs
export const getScholarships = () =>
  api.get('/scholarships');

export const addScholarship = (data) =>
  api.post('/scholarships', data);

export const deleteScholarship = (id) =>
  api.delete(`/scholarships/${id}`);

// Recommendation API
export const getRecommendations = (id) =>
  api.get(`/recommendations/${id}`);

// Application APIs
export const applyForScholarship = (studentId, scholarshipId) =>
  api.post(`/applications/${studentId}/${scholarshipId}`);

export const getMyApplications = (studentId) =>
  api.get(`/applications/student/${studentId}`);

export const getAllApplications = () =>
  api.get('/applications');

export const updateApplicationStatus = (applicationId, status) =>
  api.put(`/applications/${applicationId}/status`, null, {
    params: { status }
  });

export default api;
