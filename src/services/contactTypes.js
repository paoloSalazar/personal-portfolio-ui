import { apiRequest } from './api.js';

export const getContactTypes = () => apiRequest('/contacttypes');
export const createContactType = (contactType) => apiRequest('/contacttypes', {
  method: 'POST',
  body: JSON.stringify(contactType),
});