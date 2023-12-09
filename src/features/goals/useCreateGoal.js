import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createGoal as createGoalApi } from '../../services/apiGoals';

import toast from 'react-hot-toast';

export function useCreateGoal() {
  const queryClient = useQueryClient();

  const { mutate: createGoal, isLoading: isCreating } = useMutation({
    mutationFn: createGoalApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      toast.success('Created saving goal successfully!');
    },
    onError: (err) => {
      toast.error('Something went wrong!');
    },
  });

  return { isCreating, createGoal };
}
