import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../../services/apiUsers';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: register, isLoading } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Sign up successfully');
      navigate('/login');
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { isLoading, register };
}
