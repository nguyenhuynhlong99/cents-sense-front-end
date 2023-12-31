import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBudget as createBudgetApi } from '../../services/apiBudgets';

import toast from 'react-hot-toast';

export function useCreateBudget() {
  const queryClient = useQueryClient();

  const { mutate: createBudget, isLoading: isCreating } = useMutation({
    mutationFn: createBudgetApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      toast.success('Created budget category successfully!');
    },
    onError: (err) => {
      toast.error('Something went wrong!');
    },
  });

  return { isCreating, createBudget };
}
