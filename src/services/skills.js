import { apiRequest } from './api.js';

export const getSkills = (query = '') => apiRequest(`/skills${query ? `?query=${encodeURIComponent(query)}` : ''}`, {}, false);
export const createSkill = (skill) => apiRequest('/skills', {
  method: 'POST',
  body: JSON.stringify(skill),
});
export const getUserSkills = (userId) => apiRequest(`/users/${userId}/skills`);
export const associateSkill = (userId, skillId) => apiRequest(`/users/${userId}/skills`, {
  method: 'POST',
  body: JSON.stringify({ skill_id: skillId }),
});