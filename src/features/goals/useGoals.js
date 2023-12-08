import { useQuery } from '@tanstack/react-query';
import { getGoals } from '../../services/apiGoals';

export function useGoals() {
  const {
    isLoading,
    data: goals,
    error,
  } = useQuery({
    queryKey: ['goals'],
    queryFn: getGoals,
  });

  return { isLoading, error, goals };
}
