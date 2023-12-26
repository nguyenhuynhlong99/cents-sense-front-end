import { useCreateExpectedIncome } from './UseCreateExpectedIncome';
import { useForm } from 'react-hook-form';

import { formatCurrency } from '../../utils/helpers';
import { formatISO } from 'date-fns';

import Button from '../../ui/Button';
import ProgressBar from '../../ui/ProgressBar';
import { CheckCircle, CurrencyDollar } from '@phosphor-icons/react';
import { useUser } from '../auth/useUser';

function ExpectedIncome({ expectedIncome }) {
  const { user } = useUser();
  const userId = user?.id;

  const { isCreating, createExpectedIncome } = useCreateExpectedIncome();
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    const expectedIncomeData = {
      id: crypto.randomUUID(),
      userId,
      createdAt: formatISO(new Date()),
      ...data,
    };

    createExpectedIncome(expectedIncomeData, {
      onSuccess: () => {
        reset();
      },
    });
  }

  function onError(error) {
    console.error(error);
  }

  if (!expectedIncome) {
    return (
      <div>
        <div className="max-w-[500px] m-auto lg:max-w-none lg:m-0 lg:flex lg:items-center lg:gap-3">
          <img
            className="max-w-[300px] m-auto lg:max-w-[400px] lg:m-0"
            src="managemoney-bro.svg"
            alt="managing money"
          />
          <div className="text-center lg:text-left">
            <h4 className="text-xl font-semibold text-green-500 sm:text-2xl lg:text-3xl">
              Ready to take charge of your finances?
            </h4>
            <p className="mt-3 text-base sm:text-lg lg:text-xl">
              Start by setting your budget limit to match your monthly expected
              income. Let's align your goals with smart financial planning!
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="max-w-[400px] mt-5 mx-auto"
        >
          <div class="flex mb-2">
            <span class="inline-flex items-center px-3 bg-neutral-950 border rounded-e-0 border-neutral-400 rounded-s-md">
              <CurrencyDollar size={18} color="#22c55f" />
            </span>
            <input
              {...register('expectedIncome', {
                required: 'This field is required',
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: 'The minimum should not be smaller than 0',
                },
              })}
              type="number"
              class="rounded-none rounded-e-lg bg-neutral-950 border  focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-xs border-neutral-400 py-2.5 px-1 sm:text-sm md:text-base"
              placeholder="Enter your expected income"
            />
          </div>
          {errors?.expectedIncome?.message && (
            <p className="text-red-500 text-sm">
              {errors?.expectedIncome?.message}
            </p>
          )}
          <div className="flex items-center justify-center">
            <Button disabled={isCreating} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="mt-5 bg-neutral-950 border-2 border-green-800 p-4 rounded-lg">
      <h3 className="text-lg mb-3 md:text-xl">My monthly budget</h3>
      <div className="text-sm md:text-base">
        <p className="text-red-500 font-bold">
          🚨 Need transactions to calculate the amount of used budget!!!
        </p>
        <span>{formatCurrency(100)} </span>
        <span className="text-neutral-400">
          of {formatCurrency(expectedIncome)}
        </span>
      </div>
      <div className="grid grid-cols-[_1fr,auto] items-center gap-3">
        <ProgressBar
          height={10}
          percentage={Math.round((10 / expectedIncome) * 100)}
        />
        <span className="text-lg md:text-xl">
          {Math.round((10 / expectedIncome) * 100)}%
        </span>
      </div>
      <div className="flex gap-1 items-center">
        <CheckCircle color="#22c55f" />
        <span className="text-sm md:text-base text-green-600">
          Budget on track
        </span>
      </div>
    </div>
  );
}

export default ExpectedIncome;
