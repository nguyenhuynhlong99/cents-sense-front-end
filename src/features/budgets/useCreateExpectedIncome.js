import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createExpectedIncome as createExpectedIncomeApi } from '../../services/apiExpectedIncomes';
import toast from 'react-hot-toast';

export function useCreateExpectedIncome() {
  const queryClient = useQueryClient();

  const { mutate: createExpectedIncome, isLoading: isCreating } = useMutation({
    mutationFn: createExpectedIncomeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expectedIncomes'] });
      queryClient.invalidateQueries({ queryKey: ['expectedIncome'] });
      toast.success('Created expected income successfully!');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { isCreating, createExpectedIncome };
}
