import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAccount as deleteAccountApi } from '../../services/apiAccounts';

export function useDeleteAccount() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteAccount } = useMutation({
    mutationFn: deleteAccountApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['accounts'],
      });
    },
    onError: (err) => console.error(err),
  });

  return { isDeleting, deleteAccount };
}
