import { useForm } from 'react-hook-form';
import { useAddAccount } from './useAddAccount';
import { useUpdateAccount } from './useUpdateAccount';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

function AddAccountForm({ allTypesOfAccount, setIsShown, accountToEdit }) {
  const userId = 1;
  const { isAdding, addAccount } = useAddAccount();
  const { isUpdating, updateAccount } = useUpdateAccount();
  const { id: accountId, ...editValues } = accountToEdit;
  const isEditSession = Boolean(accountId);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isEditSession ? editValues : { color: 'black' },
  });

  const { errors } = formState;

  function onSubmit(data) {
    if (isEditSession) {
      updateAccount(
        { ...data, id: accountId },
        {
          onSuccess: () => {
            reset();
            setIsShown(false);
          },
        }
      );
    } else {
      const newAccount = {
        ...data,
        id: crypto.randomUUID(),
        userId,
      };

      addAccount(newAccount, {
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
        <FormRow label="Name" error={errors?.name?.message}>
          <Input
            autoFocus
            {...register('name', {
              required: 'This field is required',
            })}
            disabled={isAdding || isUpdating}
            type="text"
            id="name"
          />
        </FormRow>

        <FormRow label="Starting balance" error={errors?.balance?.message}>
          <Input
            defaultValue={0}
            {...register('balance', {
              valueAsNumber: true,
              min: {
                value: 0,
                message: 'Balance should not be smaller than 0',
              },
            })}
            disabled={isAdding || isUpdating}
            type="number"
            id="balance"
          />
        </FormRow>

        <FormRow label="Type" error={errors?.type?.message}>
          <select
            defaultValue=""
            {...register('type', {
              required: 'This field is required',
            })}
            disabled={isAdding || isUpdating}
            id="type"
            class="border text-sm rounded-lg block w-full px-3 py-2 bg-transparent border-neutral-500 text-white max-w-[250px]"
          >
            <option value="" disabled>
              Choose a type
            </option>
            {allTypesOfAccount.map((item) => (
              <option key={item.name} value={item.type}>
                {item.name}
              </option>
            ))}
          </select>
        </FormRow>

        <div className="py-3 grid grid-cols-1 items-center sm:grid-cols-[10em,_1fr,_1fr]">
          <span className="font-semibold text-sm sm:text-base">Color</span>
          <ul className="flex items-center gap-2">
            <li className="relative">
              <input
                {...register('color')}
                type="radio"
                value="black"
                name="color"
                id="black"
                className="sr-only peer"
              />
              <label
                htmlFor="black"
                className="block w-7 h-7 border border-neutral-500 rounded-full bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-800 peer-checked:border-green-500 cursor-pointer"
              ></label>
              <span className="hidden absolute peer-checked:block top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                &#x2713;
              </span>
            </li>
            <li className="relative">
              <input
                {...register('color')}
                type="radio"
                value="silver"
                name="color"
                id="silver"
                className="sr-only peer"
              />
              <label
                htmlFor="silver"
                className="block w-7 h-7 border border-neutral-500 rounded-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-500 peer-checked:border-green-500 cursor-pointer"
              ></label>
              <span className="hidden absolute peer-checked:block top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                &#x2713;
              </span>
            </li>
            <li className="relative">
              <input
                {...register('color')}
                type="radio"
                value="gold"
                name="color"
                id="gold"
                className="sr-only peer"
              />
              <label
                htmlFor="gold"
                className="block w-7 h-7 border border-neutral-500 rounded-full bg-gradient-to-r from-[#C6B778] via-[#D8C989] to-[#DBD1AA] peer-checked:border-green-500 cursor-pointer"
              ></label>
              <span className="hidden absolute peer-checked:block top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-neutral-950">
                &#x2713;
              </span>
            </li>
            <li className="relative">
              <input
                {...register('color')}
                type="radio"
                value="blue"
                name="color"
                id="blue"
                className="sr-only peer"
              />
              <label
                htmlFor="blue"
                className="block w-7 h-7 border border-neutral-500 rounded-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-500 peer-checked:border-green-500 cursor-pointer"
              ></label>
              <span className="hidden absolute peer-checked:block top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                &#x2713;
              </span>
            </li>
            <li className="relative">
              <input
                {...register('color')}
                type="radio"
                value="green"
                name="color"
                id="green"
                className="sr-only peer"
              />
              <label
                htmlFor="green"
                className="block w-7 h-7 border border-neutral-500 rounded-full bg-gradient-to-r from-green-800 via-green-700 to-green-500 peer-checked:border-green-500 cursor-pointer"
              ></label>
              <span className="hidden absolute peer-checked:block top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                &#x2713;
              </span>
            </li>
            <li className="relative">
              <input
                {...register('color')}
                type="radio"
                value="brown"
                name="color"
                id="brown"
                className="sr-only peer"
              />
              <label
                htmlFor="brown"
                className="block w-7 h-7 border border-neutral-500 rounded-full bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 peer-checked:border-green-500 cursor-pointer"
              ></label>
              <span className="hidden absolute peer-checked:block top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                &#x2713;
              </span>
            </li>
            <li className="relative">
              <input
                {...register('color')}
                type="radio"
                value="red"
                name="color"
                id="red"
                className="sr-only peer"
              />
              <label
                htmlFor="red"
                className="block w-7 h-7 border border-neutral-500 rounded-full bg-gradient-to-r from-red-800 via-red-600 to-red-400 peer-checked:border-green-500 cursor-pointer"
              ></label>
              <span className="hidden absolute peer-checked:block top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                &#x2713;
              </span>
            </li>
            <li className="relative">
              <input
                {...register('color')}
                type="radio"
                value="pink"
                name="color"
                id="pink"
                className="sr-only peer"
              />
              <label
                htmlFor="pink"
                className="block w-7 h-7 border border-neutral-500 rounded-full bg-gradient-to-r from-pink-600 via-pink-400 to-pink-300 peer-checked:border-green-500 cursor-pointer"
              ></label>
              <span className="hidden absolute peer-checked:block top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                &#x2713;
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex text-lg">
        <div className="ml-auto flex gap-3">
          <button
            disabled={isAdding || isUpdating}
            type="reset"
            onClick={() => setIsShown(false)}
            className="p-2 w-[80px] border text-gray-400 border-neutral-500 rounded-md hover:text-inherit hover:border-white focus:text-inherit focus:border-white"
          >
            Cancel
          </button>
          <button
            disabled={isAdding || isUpdating}
            type="submit"
            className="p-2 w-[80px] bg-green-500 border text-neutral-950 border-transparent rounded-md hover:text-inherit hover:bg-transparent hover:border-green-500 focus:text-inherit focus:bg-transparent focus:border-green-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddAccountForm;
