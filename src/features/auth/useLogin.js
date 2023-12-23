import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiUsers';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/overview', { replace: true });
    },
    onError: (err) => {
      console.error(err);
      toast.error('Provided email or password are incorrect');
    },
  });

  return { isLoading, login };
}