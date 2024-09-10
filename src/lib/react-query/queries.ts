import { useMutation, useQuery } from '@tanstack/react-query';
import { INewUser } from '../types';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../appwrite/api';
import { toast } from 'sonner';
import { QUERY_KEYS } from './query-keys';

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (user: INewUser) => registerUser(user),
    onSuccess: () => {
      toast.success('Registeration successful.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) => loginUser(user),
    onSuccess: () => {
      toast.success('Logged in successfully.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success('Logged out successfully.');
    },
    onError: () => {
      toast.success('Unable to log out, please try again.');
    },
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};
