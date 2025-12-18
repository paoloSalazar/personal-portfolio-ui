import { getSkills } from '../services/skills.js';
import useApi from './useApi.js';

const useSkills = (query = '') => {
  return useApi(() => getSkills(query), [query]);
};

export default useSkills;