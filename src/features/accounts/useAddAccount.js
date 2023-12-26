import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAccount } from '../../services/apiAccounts';
import toast from 'react-hot-toast';

export function useAddAccount() {
  const queryClient = useQueryClient();

  const { mutate: addAccount, isLoading: isAdding } = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Added new account successfully!');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { isAdding, addAccount };
}
