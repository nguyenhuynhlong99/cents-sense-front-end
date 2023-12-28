import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addExpenseTransaction } from '../../services/apiTransactions';

import toast from 'react-hot-toast';

export function useAddExpense() {
  const queryClient = useQueryClient();

  const { mutate: createExpenseTransaction, isLoading: isCreating } =
    useMutation({
      mutationFn: addExpenseTransaction,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
        queryClient.invalidateQueries({ queryKey: ['accounts'] });
        toast.success('Created expense transaction successfully!');
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { isCreating, createExpenseTransaction };
}
