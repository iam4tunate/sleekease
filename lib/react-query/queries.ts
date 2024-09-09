import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { QUERY_KEYS } from './keys';
import { loginUser, registerUser } from '../actions/user.actions';

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (user: INewUser) => registerUser(user),
    onSuccess: () => {
      toast.success('Account created successfully');
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

// export const useLogoutUser = () => {
//   return useMutation({
//     mutationFn: logoutUser,
//   });
// };

// export const useGetCurrentUser = () => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.GET_CURRENT_USER],
//     queryFn: getCurrentUser,
//   });
// };
