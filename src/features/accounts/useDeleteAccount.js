import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAccount as deleteAccountApi } from '../../services/apiAccounts';
import toast from 'react-hot-toast';

export function useDeleteAccount() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteAccount } = useMutation({
    mutationFn: deleteAccountApi,
    onSuccess: () => {
      toast.success('Deleted Account Successfully!');
      queryClient.invalidateQueries({
        queryKey: ['accounts'],
      });
    },
    onError: (err) => console.log(err),
  });

  return { isDeleting, deleteAccount };
}
