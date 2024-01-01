import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '../../services/apiTransactions';

export function useTransactions() {
  const {
    isLoading,
    data: transactions,
    error,
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
    retry: 0,
  });

  return { isLoading, error, transactions };
}
