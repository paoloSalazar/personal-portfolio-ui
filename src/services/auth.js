import { API_BASE_URL, handleResponse } from './api.js';

export const login = async (email, password) => {
  const url = `${API_BASE_URL}/auth/login`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

export const register = async (email, password, firstName, lastName) => {
  const url = `${API_BASE_URL}/auth/register`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name: firstName, last_name: lastName }),
  });
  return handleResponse(response);
};