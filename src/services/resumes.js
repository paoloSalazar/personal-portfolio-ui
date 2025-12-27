import { apiRequest } from './api.js';

export const getResumes = (userId) => apiRequest(`/users/${userId}/resumes`);
export const createResume = (userId, resume) => apiRequest(`/users/${userId}/resumes`, {
  method: 'POST',
  body: JSON.stringify(resume),
});
export const associateResumeSkills = (userId, resumeId, skillIds) => apiRequest(`/users/${userId}/resumes/${resumeId}/skills`, {
  method: 'POST',
  body: JSON.stringify({ skill_ids: skillIds }),
});
export const getResumeSkills = (userId, resumeId) => apiRequest(`/users/${userId}/resumes/${resumeId}/skills`);