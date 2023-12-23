import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiUsers';

export function useUser() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    retry: false, //by default React Query will try to fetch the data 3 times in case it fails in the beginning.
  });
  const isAuthenticated = Boolean(user?.id);

  return { isLoading, error, user, isAuthenticated };
}
