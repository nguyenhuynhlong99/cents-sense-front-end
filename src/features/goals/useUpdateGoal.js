import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editGoal } from '../../services/apiGoals';
import toast from 'react-hot-toast';

export function useUpdateGoal() {
  const queryClient = useQueryClient();

  const { mutate: updateGoal, isLoading: isUpdating } = useMutation({
    mutationFn: editGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      toast.success('Updated budget successfully!');
    },
    onError: (err) => {
      console.error(err);
    },
  });
  return { updateGoal, isUpdating };
}
