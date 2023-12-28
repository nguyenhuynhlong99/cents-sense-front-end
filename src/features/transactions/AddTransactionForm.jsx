import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAccounts } from '../accounts/useAccounts';
import { useBudgets } from '../budgets/useBudgets';
import { useGoals } from '../goals/useGoals';

import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import ModalButton from '../../ui/ModalButton';
import { formatISO, getMonth, getYear, parseISO } from 'date-fns';
import { useAddIncome } from './useAddIncome';
import { currentMonth, currentYear } from '../../utils/helpers';
import { useAddExpense } from './useAddExpense';
import { useAddTransfer } from './useAddTransfer';
import { useUser } from '../auth/useUser';

function AddTransactionForm({ setIsShown }) {
  const { user } = useUser();
  const userId = user?.id;
  const { accounts } = useAccounts();
  const { goals } = useGoals();
  const [formType, setFormType] = useState('income');
  const [transferType, setTransferType] = useState('account');

  const { createIncomeTransaction, isCreating: isCreatingIncome } =
    useAddIncome();
  const { createExpenseTransaction, isCreating: isCreatingExpense } =
    useAddExpense();
  const { createTransferTransaction, isCreating: isCreatingTransfer } =
    useAddTransfer();

  const {
    register,
    formState,
    handleSubmit,
    reset,
    getValues,
    watch,
    setValue,
  } = useForm();
  const { errors } = formState;

  const userAccounts =
    formType === 'income'
      ? accounts?.filter((acc) => acc.userId === userId && acc.type === 'debit')
      : accounts?.filter((acc) => acc.userId === userId);

  const accountIdValue = watch('accountId');
  const toUserAccounts = userAccounts?.filter(
    (acc) => acc.id !== accountIdValue
  );
  const userGoals = goals?.filter((g) => g.userId === userId);

  const userBudgets = user?.budgets;

  const formTypeButtons = ['income', 'expense', 'transfer'];

  const activeStyle = {
    color: 'rgb(240,253,244)',
    borderColor: 'rgb(22,163,74)',
    backgroundColor: 'rgb(22,163,74)',
  };

  const transferTypeStyle = {
    border: '1px solid rgb(34,197,94)',
    color: 'rgb(34,197,94)',
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
    } else {
      const newTransaction =
        transferType === 'account'
          ? {
              id: crypto.randomUUID(),
              userId,
              date: formatISO(new Date()),
              type: formType,
              goalId: 0,
              ...data,
            }
          : {
              id: crypto.randomUUID(),
              userId,
              date: formatISO(new Date()),
              type: formType,
              toAccountId: 0,
              ...data,
            };

      createTransferTransaction(newTransaction, {
        onSuccess: () => {
          reset();
          setIsShown(false);
        },
      });
    }
  }

  function onError() {
    console.log('Something went wrong!');
  }

  return (
    <>
      <div className="flex gap-2 items-center">
        {formTypeButtons.map((type) => (
          <button
            key={`key-${type}-button`}
            className="capitalize border border-neutral-600 rounded-md hover:bg-green-600 hover:text-green-50 hover:border-green-600 transition-all duration-[300ms] p-2 text-xs sm:text-sm"
            style={formType === type ? activeStyle : null}
            disabled={formType === type}
            onClick={() => {
              setFormType(type);
              reset();
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {formType === 'transfer' && (
        <div className="mt-3 text-sm sm:flex sm:gap-3 sm:items-center">
          <span className="text-base font-semibold text-green-500">
            Transfer To:
          </span>
          <div className="mt-2 flex gap-3 sm:mt-0">
            <button
              className="border border-neutral-600 text-neutral-400 p-2 rounded-md transition-all duration-300 hover:border-green-500 hover:text-green-500"
              style={transferType === 'account' ? transferTypeStyle : null}
              onClick={() => {
                setTransferType('account');
                reset();
              }}
            >
              Account
            </button>
            <button
              className="border border-neutral-600 text-neutral-400 p-2 rounded-md transition-all duration-300 hover:border-green-500 hover:text-green-500"
              style={transferType === 'savingGoal' ? transferTypeStyle : null}
              onClick={() => {
                setTransferType('savingGoal');
                reset();
              }}
            >
              Saving Goal
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit, onError)}>
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

          {formType === 'transfer' && (
            <FormRow label="To" error={errors?.toAccountId?.message}>
              <select
                defaultValue=""
                {...register(
                  transferType === 'account' ? 'toAccountId' : 'goalId',
                  {
                    required: 'This field is required',
                  }
                )}
                disabled={!accountIdValue}
                id="toAccountId"
                className="cursor-pointer border text-sm rounded-lg block w-full px-3 py-2 bg-transparent border-neutral-500 text-white max-w-[250px] capitalize"
              >
                <option value="" disabled>
                  Choose an account
                </option>
                {transferType === 'account'
                  ? toUserAccounts?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))
                  : userGoals?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
              </select>
            </FormRow>
          )}

          {(formType === 'expense' || formType === 'transfer') && (
            <FormRow label="Category" error={errors?.budgetId?.message}>
              <select
                defaultValue=""
                {...register('budgetId', {
                  required: 'This field is required',
                  setValueAs: (v) => (v === '0' ? parseInt(v) : v),
                })}
                disabled={isCreatingIncome}
                id="budgetId"
                className="cursor-pointer border text-sm rounded-lg block w-full px-3 py-2 bg-transparent border-neutral-500 text-white max-w-[250px] capitalize"
              >
                <option value="" disabled>
                  Choose a category
                </option>
                <option value="0">None</option>
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
