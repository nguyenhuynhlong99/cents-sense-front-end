import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAccounts } from '../accounts/useAccounts';

import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import ModalButton from '../../ui/ModalButton';
import { formatISO } from 'date-fns';
import { useAddIncome } from './useAddIncome';

function AddTransactionForm({ setIsShown }) {
  const userId = 1;
  const { accounts } = useAccounts();
  const { createIncomeTransaction, isCreating: isCreatingIncome } =
    useAddIncome();
  const [formType, setFormType] = useState('income');

  const { register, formState, handleSubmit, reset } = useForm({
    // defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const userAccounts =
    formType === 'income'
      ? accounts?.filter((acc) => acc.userId === userId && acc.type === 'debit')
      : accounts?.filter((acc) => acc.userId === userId);

  const formTypeButtons = ['income', 'expense', 'transfer'];

  const activeStyle = {
    color: 'rgb(240,253,244)',
    borderColor: 'rgb(22,163,74)',
    backgroundColor: 'rgb(22,163,74)',
  };

  function onSubmit(data) {
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
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-3">
        {formTypeButtons.map((type) => (
          <button
            key={`key-${type}-button`}
            className="capitalize border border-neutral-600 rounded-md p-2 hover:bg-green-600 hover:text-green-50 hover:border-green-600 transition-all duration-[500ms]"
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
              class="cursor-pointer border text-sm rounded-lg block w-full px-3 py-2 bg-transparent border-neutral-500 text-white sm:max-w-[250px]"
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
            // disabled={isCreating || isUpdating}
            type="reset"
            variations="secondary"
          >
            Cancel
          </ModalButton>
          <ModalButton
            // disabled={isCreating || isUpdating}
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
