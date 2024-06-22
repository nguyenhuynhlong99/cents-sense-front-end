import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTransferTransaction } from '../../services/apiTransactions';

import toast from 'react-hot-toast';

export function useAddTransfer() {
  const queryClient = useQueryClient();

  const { mutate: createTransferTransaction, isLoading: isCreating } =
    useMutation({
      mutationFn: addTransferTransaction,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
        queryClient.invalidateQueries({ queryKey: ['accounts'] });
        queryClient.invalidateQueries({ queryKey: ['goals'] });
        toast.success('Created transfer transaction successfully!');
      },
      onError: (err) => {
        console.log(err);
      },
    });

  return { isCreating, createTransferTransaction };
}
