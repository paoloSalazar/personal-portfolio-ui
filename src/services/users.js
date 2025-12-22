import { API_BASE_URL, handleResponse, apiRequest } from './api.js';

export const getUsers = () => apiRequest('/users');

export const getUser = (userId) => apiRequest(`/users/${userId}`);

export const createUser = async (userData, photoFile) => {
  const url = `${API_BASE_URL}/users`;
  const formData = new FormData();
  formData.append('data', JSON.stringify(userData));
  if (photoFile) {
    formData.append('photo', photoFile);
  }
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  return handleResponse(response);
};