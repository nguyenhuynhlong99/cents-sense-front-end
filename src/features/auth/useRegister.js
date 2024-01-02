import { useMutation } from '@tanstack/react-query';
import { register as registerApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useRegister() {
  const { mutate: register, isLoading } = useMutation({
    mutationFn: registerApi,
    onSuccess: (user) => {
      console.log(user);

      toast.success(
        'Signed up successfully! Please verify the new account from your email'
      );
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { isLoading, register };
}
