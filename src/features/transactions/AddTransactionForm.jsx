import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAccounts } from '../accounts/useAccounts';
import { useBudgets } from '../budgets/useBudgets';

import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import ModalButton from '../../ui/ModalButton';
import { formatISO, getMonth, getYear, parseISO } from 'date-fns';
import { useAddIncome } from './useAddIncome';
import { currentMonth, currentYear } from '../../utils/helpers';
import { useAddExpense } from './useAddExpense';

function AddTransactionForm({ setIsShown }) {
  const userId = 1;
  const { accounts } = useAccounts();
  const { budgets } = useBudgets();
  const { createIncomeTransaction, isCreating: isCreatingIncome } =
    useAddIncome();
  const { createExpenseTransaction, isCreating: isCreatingExpense } =
    useAddExpense();
  const [formType, setFormType] = useState('income');

  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const userAccounts =
    formType === 'income'
      ? accounts?.filter((acc) => acc.userId === userId && acc.type === 'debit')
      : accounts?.filter((acc) => acc.userId === userId);

  const userBudgets = budgets?.filter(
    (b) => b.userId === userId
    // getYear(parseISO(b.createdAt)) === currentYear &&
    // getMonth(parseISO(b.createdAt)) === currentMonth
  );

  const formTypeButtons = ['income', 'expense', 'transfer'];

  const activeStyle = {
    color: 'rgb(240,253,244)',
    borderColor: 'rgb(22,163,74)',
    backgroundColor: 'rgb(22,163,74)',
  };

  function onSubmit(data) {
    if (formType === 'income') {
      const newTransaction = {
        id: crypto.randomUUID(),
        userId,
        toAccountId: 0,
        budgetId: 0,
        date: formatISO(new Date()),
        type: formType,
        ...data,
      };
      createIncomeTransaction(newTransaction, {
        onSuccess: () => {
          reset();
          setIsShown(false);
        },
      });
    } else if (formType === 'expense') {
      const newTransaction = {
        id: crypto.randomUUID(),
        userId,
        toAccountId: 0,
        date: formatISO(new Date()),
        type: formType,
        ...data,
      };

      createExpenseTransaction(newTransaction, {
        onSuccess: () => {
          reset();
          setIsShown(false);
        },
      });
    }
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-3">
        {formTypeButtons.map((type) => (
          <button
            key={`key-${type}-button`}
            className="capitalize border border-neutral-600 rounded-md p-2 hover:bg-green-600 hover:text-green-50 hover:border-green-600 transition-all duration-[300ms]"
            style={formType === type ? activeStyle : null}
            disabled={formType === type}
            onClick={() => setFormType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="divide-y divide-neutral-700">
          <FormRow label="Amount" error={errors?.amount?.message}>
            <Input
              {...register('amount', {
                required: 'This field is required',
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: 'Amount should be at least 1',
                },
              })}
              disabled={isCreatingIncome}
              id="amount"
              type="number"
            />
          </FormRow>

          <FormRow label="From" error={errors?.accountId?.message}>
            <select
              defaultValue=""
              {...register('accountId', {
                required: 'This field is required',
              })}
              disabled={isCreatingIncome}
              id="accountId"
              className="cursor-pointer border text-sm rounded-lg block w-full px-3 py-2 bg-transparent border-neutral-500 text-white max-w-[250px] capitalize"
            >
              <option value="" disabled>
                Choose an account
              </option>
              {userAccounts?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormRow>

          {formType === 'expense' && (
            <FormRow label="Category" error={errors?.budgetId?.message}>
              <select
                defaultValue={0}
                {...register('budgetId', {
                  required: 'This field is required',
                })}
                disabled={isCreatingIncome}
                id="budgetId"
                className="cursor-pointer border text-sm rounded-lg block w-full px-3 py-2 bg-transparent border-neutral-500 text-white sm:max-w-[250px] capitalize"
              >
                <option value={0}>None</option>
                {userBudgets?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.category}
                  </option>
                ))}
              </select>
            </FormRow>
          )}

          <FormRow label="Description" error={errors?.description?.message}>
            <Input
              {...register('description', {
                required: 'This field is required',
              })}
              disabled={isCreatingIncome}
              id="description"
              type="text"
            />
          </FormRow>
        </div>

        <div className="mt-3 flex justify-end gap-2">
          <ModalButton
            onClick={() => setIsShown(false)}
            disabled={isCreatingIncome || isCreatingExpense}
            type="reset"
            variations="secondary"
          >
            Cancel
          </ModalButton>
          <ModalButton
            disabled={isCreatingIncome || isCreatingExpense}
            type="submit"
          >
            Save
          </ModalButton>
        </div>
      </form>
    </>
  );
}

export default AddTransactionForm;
