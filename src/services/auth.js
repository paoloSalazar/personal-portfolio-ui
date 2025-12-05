import { apiRequest } from './api.js';

export const login = async (email, password) => {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const register = async (email, password, name) => {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  });
};