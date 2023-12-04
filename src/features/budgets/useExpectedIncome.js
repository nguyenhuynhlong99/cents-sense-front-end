import { useQuery } from '@tanstack/react-query';
import { getExpectedIncomes } from '../../services/apiExpectedIncomes';

export function useExpectedIncomes() {
  const {
    isLoading,
    data: expectedIncomes,
    error,
  } = useQuery({
    queryKey: ['expectedIncomes'],
    queryFn: getExpectedIncomes,
  });
  return { isLoading, error, expectedIncomes };
}
