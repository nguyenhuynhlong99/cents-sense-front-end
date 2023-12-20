import { useQuery } from '@tanstack/react-query';
import { getAccount } from '../../services/apiAccounts';

export function useAccount(accountID) {
  const {
    isLoading,
    data: account,
    error,
  } = useQuery({
    queryKey: ['accounts', accountID],
    queryFn: () => getAccount({ id: accountID }),
    retry: false, //by default React Query will try to fetch the data 3 times in case it fails in the beginning.
  });

  return { isLoading, error, account };
}
