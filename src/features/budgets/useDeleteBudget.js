import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBudget as deleteBudgetApi } from '../../services/apiBudgets';
import toast from 'react-hot-toast';

export function useDeleteBudget() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBudget } = useMutation({
    mutationFn: deleteBudgetApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['budgets'],
      });
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      toast.success('Deleted budget successfully!');
    },
    onError: (err) => console.error(err),
  });

  return { isDeleting, deleteBudget };
}
