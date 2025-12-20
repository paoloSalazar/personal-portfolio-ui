import { apiRequest } from './api.js';

export const getUserContacts = (userId) => apiRequest(`/users/${userId}/contacts`);

export const createContact = (userId, contact) => apiRequest(`/users/${userId}/contacts`, {
  method: 'POST',
  body: JSON.stringify(contact),
});