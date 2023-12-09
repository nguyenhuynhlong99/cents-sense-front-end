import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGoal as deleteGoalApi } from '../../services/apiGoals';
import toast from 'react-hot-toast';

export function useDeleteGoal() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteGoal } = useMutation({
    mutationFn: deleteGoalApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['goals'],
      });
      toast.success('Deleted goal successfully!');
    },
    onError: (err) => console.error(err),
  });

  return { isDeleting, deleteGoal };
}
