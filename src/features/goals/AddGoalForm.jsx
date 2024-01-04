import { useForm } from 'react-hook-form';
import { useCreateGoal } from './useCreateGoal';
import { useUpdateGoal } from './useUpdateGoal';
import { useUser } from '../auth/useUser';

import FormRow from '../../ui/FormRow';
import Icon from '../../ui/Icon';
import Input from '../../ui/Input';
import ModalButton from '../../ui/ModalButton';
import { listOfIcons } from '../../utils/helpers';

function AddGoalForm({ goalToEdit, setIsShown }) {
  const { user } = useUser();
  const userId = user?.id;
  const { isCreating, createGoal } = useCreateGoal();
  const { isUpdating, updateGoal } = useUpdateGoal();

  const { id: goalID, ...editValues } = goalToEdit;
  const isEditSession = Boolean(goalID);

  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    if (isEditSession) {
      const updatedGoal = {
        id: goalID,
        ...data,
      };

      updateGoal(
        { goal: updatedGoal, id: goalID },
        {
          onSuccess: () => {
            reset();
            setIsShown(false);
          },
        }
      );
    } else {
      const newGoal = {
        userId,
        ...data,
      };

      createGoal(newGoal, {
        onSuccess: () => {
          reset();
          setIsShown(false);
        },
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-base">
      <div className="divide-y divide-neutral-700">
        <FormRow label="Name" error={errors?.name?.message}>
          <Input
            {...register('name', {
              required: 'This field is required',
            })}
            disabled={isCreating || isUpdating}
            autoFocus
            type="text"
            id="name"
          />
        </FormRow>

        <FormRow label="Starting amount" error={errors?.currentAmount?.message}>
          <Input
            {...register('currentAmount', {
              required: 'This field is required',
              valueAsNumber: true,
              min: {
                value: 0,
                message: 'Starting amount should be at least 0',
              },
            })}
            disabled={isCreating || isUpdating}
            defaultValue={0}
            type="number"
            id="currentAmount"
          />
        </FormRow>

        <FormRow label="Target amount" error={errors?.targetAmount?.message}>
          <Input
            {...register('targetAmount', {
              required: 'This field is required',
              valueAsNumber: true,
              min: {
                value: 1,
                message: 'Target amount should be at least 1',
              },
            })}
            disabled={isCreating || isUpdating}
            type="number"
            id="targetAmount"
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

export default AddGoalForm;
