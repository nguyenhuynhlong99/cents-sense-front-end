import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '../../services/apiTransactions';
import { useSearchParams } from 'react-router-dom';

export function useTransactions() {
  const [searchParams] = useSearchParams();

  //FILTER
  const filterValue = searchParams.get('type');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'type', value: filterValue };

  const {
    isLoading,
    data: transactions,
    error,
  } = useQuery({
    queryKey: ['transactions', filter],
    queryFn: () => getTransactions({ filter }),
  });

  return { isLoading, error, transactions };
}
