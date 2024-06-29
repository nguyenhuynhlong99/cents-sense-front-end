import { useMutation } from '@tanstack/react-query';
import { register as registerApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useRegister() {
  const { mutate: register, isLoading } = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      if (data.data.user) {
        toast.success(
          'Please verify the new account from your email to sign up'
        );
      } else {
        toast.error(data.error.message);
      }
    },
  });

  return { isLoading, register };
}
