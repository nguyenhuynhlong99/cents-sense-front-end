import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editBudget } from '../../services/apiBudgets';
import toast from 'react-hot-toast';

export function useUpdateBudget() {
  const queryClient = useQueryClient();

  const { mutate: updateBudget, isLoading: isUpdating } = useMutation({
    mutationFn: ({ budget, id }) => editBudget(budget, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Updated budget successfully!');
    },
    onError: (err) => {
      console.error(err);
    },
  });
  return { updateBudget, isUpdating };
}
