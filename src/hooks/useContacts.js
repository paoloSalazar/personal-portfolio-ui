import { getUserContacts } from '../services/contact.js';
import useApi from './useApi.js';

const useContacts = (userId) => {
  return useApi(() => userId ? getUserContacts(userId) : Promise.resolve([]), [userId]);
};

export default useContacts;