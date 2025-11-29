import { getContactTypes } from '../services/contactTypes.js';
import useApi from './useApi.js';

const useContactTypes = () => {
  return useApi(getContactTypes);
};

export default useContactTypes;