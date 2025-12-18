import { getUserSkills } from '../services/skills.js';
import useApi from './useApi.js';

const useUserSkills = (userId) => {
  return useApi(() => getUserSkills(userId), [userId]);
};

export default useUserSkills;