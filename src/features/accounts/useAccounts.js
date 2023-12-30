import { useQuery } from '@tanstack/react-query';
import { getAccounts } from '../../services/apiAccounts';
import toast from 'react-hot-toast';

export function useAccounts() {
  const {
    isLoading,
    data: accounts,
    error,
  } = useQuery({
    queryKey: ['accounts'],
    queryFn: getAccounts,
  });
  if (error) {
    toast.error(error);
  }

  return { isLoading, error, accounts };
}
