import { useQuery } from '@tanstack/react-query';
import { getBudgets } from '../../services/apiBudgets';

export function useBudgets() {
  const {
    isLoading,
    data: budgets,
    error,
  } = useQuery({
    queryKey: ['budgets'],
    queryFn: getBudgets,
  });

  return { isLoading, error, budgets };
}
