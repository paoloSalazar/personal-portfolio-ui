import { apiRequest } from './api.js';

export const getContactTypes = () => apiRequest('/contacttypes');