import { getResumes, getResumeSkills } from '../services/resumes.js';
import useApi from './useApi.js';

const useResumes = (userId) => {
  return useApi(() => getResumes(userId), [userId]);
};

const useResumeSkills = (userId, resumeId) => {
  return useApi(() => getResumeSkills(userId, resumeId), [userId, resumeId]);
};

export default useResumes;
export { useResumeSkills };