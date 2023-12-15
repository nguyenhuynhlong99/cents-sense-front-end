import { useQuery } from '@tanstack/react-query';
import { getAccount } from '../../services/apiAccounts';
// import { useParams } from 'react-router-dom';

export function useAccount(accountID) {
  //   const { bookingId } = useParams();

  const {
    isLoading,
    data: account,
    error,
  } = useQuery({
    queryKey: ['booking', accountID],
    queryFn: () => getAccount(accountID),
    retry: false, //by default React Query will try to fetch the data 3 times in case it fails in the beginning.
  });

  return { isLoading, error, account };
}
