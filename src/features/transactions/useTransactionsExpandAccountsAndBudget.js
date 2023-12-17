import { useQuery } from '@tanstack/react-query';
import { getTransactionExpandAccountAndBudget } from '../../services/apiTransactions';
import { useSearchParams } from 'react-router-dom';

export function useTransactionsExpandAccountAndBudget() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('type') || 'all';

  const filter = { type: filterValue };

  const {
    isLoading,
    data: transactionsExpandAccountBudget,
    error,
  } = useQuery({
    queryKey: ['transactions', filterValue],
    queryFn: () => getTransactionExpandAccountAndBudget(filter),
  });

  return { isLoading, error, transactionsExpandAccountBudget };
}
