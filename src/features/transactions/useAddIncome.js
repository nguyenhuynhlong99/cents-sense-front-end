import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addIncomeTransaction } from '../../services/apiTransactions';
import toast from 'react-hot-toast';

export function useAddIncome() {
  const queryClient = useQueryClient();

  const { mutate: createIncomeTransaction, isLoading: isCreating } =
    useMutation({
      mutationFn: addIncomeTransaction,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
        queryClient.invalidateQueries({ queryKey: ['accounts'] });
        toast.success('Created transaction successfully!');
      },
      onError: (err) => {
        console.error(err);
      },
    });
  return { createIncomeTransaction, isCreating };
}
