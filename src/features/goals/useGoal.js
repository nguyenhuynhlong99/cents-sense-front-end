import { useQuery } from '@tanstack/react-query';
import { getGoal } from '../../services/apiGoals';

export function useGoal(goalId) {
  const {
    isLoading,
    data: goal,
    error,
  } = useQuery({
    queryKey: ['goals', goalId],
    queryFn: () => getGoal({ id: goalId }),
    retry: false, //by default React Query will try to fetch the data 3 times in case it fails in the beginning.
  });

  return { isLoading, error, goal };
}
