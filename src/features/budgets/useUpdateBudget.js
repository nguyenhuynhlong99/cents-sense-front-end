import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editBudget } from '../../services/apiBudgets';
import toast from 'react-hot-toast';

export function useUpdateBudget() {
  const queryClient = useQueryClient();

  const { mutate: updateBudget, isLoading: isUpdating } = useMutation({
    mutationFn: editBudget,
    onSuccess: () => {
      toast.success('Updated budget successfully!');
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
  return { updateBudget, isUpdating };
}
