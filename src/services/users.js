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

export const updateUser = async (userId, userData) => {
  return apiRequest(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
};

export const uploadPhoto = async (userId, photoFile) => {
  const url = `${API_BASE_URL}/users/${userId}/upload-photo`;
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('photo', photoFile);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
    body: formData,
  });
  return handleResponse(response);
};