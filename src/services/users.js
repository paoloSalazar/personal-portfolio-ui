import { apiRequest } from './api.js';

export const getUsers = () => apiRequest('/users');

export const getUser = (userId) => apiRequest(`/users/${userId}`);