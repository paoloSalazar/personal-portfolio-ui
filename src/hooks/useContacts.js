import { getUserContacts } from '../services/contact.js';
import useApi from './useApi.js';

const useContacts = (userId) => {
  return useApi(() => getUserContacts(userId), [userId]);
};

export default useContacts;