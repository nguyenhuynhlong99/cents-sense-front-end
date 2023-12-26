import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editAccount } from '../../services/apiAccounts';
import toast from 'react-hot-toast';

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  const { mutate: updateAccount, isLoading: isUpdating } = useMutation({
    mutationFn: editAccount,
    onSuccess: () => {
      toast.success('Edit account successfully!');
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
  return { updateAccount, isUpdating };
}
