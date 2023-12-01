import { useQuery } from '@tanstack/react-query';
import { getAccounts } from '../../services/apiAccounts';

export function useAccounts() {
  const {
    isLoading,
    data: accounts,
    error,
  } = useQuery({
    queryKey: ['accounts'],
    queryFn: getAccounts,
  });
  return { isLoading, error, accounts };
}
