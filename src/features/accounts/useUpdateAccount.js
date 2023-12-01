import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editAccount } from '../../services/apiAccounts';

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  const { mutate: updateAccount, isLoading: isUpdating } = useMutation({
    mutationFn: editAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
  return { updateAccount, isUpdating };
}
