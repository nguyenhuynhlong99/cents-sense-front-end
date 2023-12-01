import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAccount } from '../../services/apiAccounts';

export function useAddAccount() {
  const queryClient = useQueryClient();

  const { mutate: addAccount, isLoading: isAdding } = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { isAdding, addAccount };
}
