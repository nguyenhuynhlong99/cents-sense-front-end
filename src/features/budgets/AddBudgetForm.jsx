import { useForm } from 'react-hook-form';
import { useBudgets } from './useBudgets';

import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import ModalButton from '../../ui/ModalButton';
import { useCreateBudget } from './useCreateBudget';
import { formatISO } from 'date-fns';
import Icon from '../../ui/Icon';
import { listOfIcons } from '../../utils/helpers';
import { useUpdateBudget } from './useUpdateBudget';

function AddBudgetForm({
  setIsShown,
  expectedIncomeID,
  expectedIncomeAmount,
  budgetToEdit,
}) {
  const { isLoading, budgets } = useBudgets();
  const { isCreating, createBudget } = useCreateBudget();
  const { isUpdating, updateBudget } = useUpdateBudget();

  const { id: budgetID, ...editValues } = budgetToEdit;
  const isEditSession = Boolean(budgetID);

  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const monthlyBudgetsData = getAllBudgetsData();
  let monthlyBudgetsRemain = getBudgetsRemain();

  monthlyBudgetsRemain = isEditSession
    ? monthlyBudgetsRemain + editValues.amount
    : monthlyBudgetsRemain;

  function getAllBudgetsData() {
    return budgets?.filter((b) => b.expectedIncomeID === expectedIncomeID);
  }

  function getBudgetsRemain() {
    const totalCurrentBudgetsAmount = monthlyBudgetsData?.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );
    return expectedIncomeAmount - totalCurrentBudgetsAmount;
  }

  function onSubmit(data) {
    if (isEditSession) {
      const updatedBudget = {
        ...data,
        id: budgetID,
        createdAt: formatISO(new Date()),
      };

      updateBudget(updatedBudget, {
        onSuccess: () => {
          reset();
          setIsShown(false);
        },
      });
    } else {
      const newBudget = {
        id: crypto.randomUUID(),
        expectedIncomeID,
        ...data,
        createdAt: formatISO(new Date()),
      };

      createBudget(newBudget, {
        onSuccess: () => {
          reset();
          setIsShown(false);
        },
      });
    }
  }

  function onError(error) {
    console.error(error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="text-base">
      <div className="divide-y divide-neutral-700">
        <FormRow label="Category Name" error={errors?.category?.message}>
          <Input
            {...register('category', {
              required: 'This field is required',
            })}
            disabled={isCreating || isUpdating}
            autoFocus
            type="text"
            id="category"
          />
        </FormRow>

        <FormRow label="Amount" error={errors?.amount?.message}>
          <Input
            {...register('amount', {
              required: 'This field is required',
              valueAsNumber: true,
              min: {
                value: 1,
                message: 'Amount should be at least 1',
              },
              max: {
                value: monthlyBudgetsRemain,
                message: `Amount exceeded your remaining expected income`,
              },
            })}
            disabled={isCreating || isUpdating}
            type="number"
            id="amount"
          />
        </FormRow>

        <FormRow error={errors?.icon?.message}>
          <span className="font-semibold text-sm sm:text-base">Icon</span>
          <ul className="flex flex-wrap gap-2">
            {listOfIcons.map((name) => (
              <li key={name}>
                <input
                  {...register('icon', {
                    required: 'This field is required',
                  })}
                  disabled={isCreating || isUpdating}
                  type="radio"
                  value={name}
                  name="icon"
                  id={name}
                  className="sr-only peer"
                />
                <label
                  htmlFor={name}
                  className="flex items-center justify-center p-3 border-2 border-neutral-500 rounded-full peer-checked:border-green-500 peer-checked:bg-green-600 cursor-pointer"
                >
                  <Icon name={name} color="rgb(240 253 244)" />
                </label>
              </li>
            ))}
          </ul>
        </FormRow>
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <ModalButton
          onClick={() => setIsShown(false)}
          disabled={isCreating || isUpdating}
          type="reset"
          variations="secondary"
        >
          Cancel
        </ModalButton>
        <ModalButton disabled={isCreating || isUpdating} type="submit">
          Save
        </ModalButton>
      </div>
    </form>
  );
}

export default AddBudgetForm;
