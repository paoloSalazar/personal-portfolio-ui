import { getUsers, getUser } from '../services/users.js';
import useApi from './useApi.js';

export const useUsers = () => {
  return useApi(getUsers);
};

export const useUser = (userId) => {
  return useApi(() => getUser(userId), [userId]);
};