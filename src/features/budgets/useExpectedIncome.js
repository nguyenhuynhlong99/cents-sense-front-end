import { useQuery } from '@tanstack/react-query';
import { getMonthlyExpectedIncome } from '../../services/apiExpectedIncomes';

export function useExpectedIncome() {
  const {
    isLoading,
    data: expectedIncome,
    error,
  } = useQuery({
    queryKey: ['expectedIncome'],
    queryFn: getMonthlyExpectedIncome,
  });
  return { isLoading, error, expectedIncome };
}
