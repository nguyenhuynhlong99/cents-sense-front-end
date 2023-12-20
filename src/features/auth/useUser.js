import { useQuery } from '@tanstack/react-query';
import { getUserWithEmbedData } from '../../services/apiUsers';

export function useUser(userId) {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => getUserWithEmbedData({ id: userId }),
    retry: false, //by default React Query will try to fetch the data 3 times in case it fails in the beginning.
  });

  return { isLoading, error, user };
}
