export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new ApiError(error || 'API request failed', response.status);
  }
  return response.json();
};

const apiRequest = async (endpoint, options = {}, includeToken = true) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = includeToken ? localStorage.getItem('token') : null;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Network error', 0);
  }
};

export { apiRequest, ApiError };