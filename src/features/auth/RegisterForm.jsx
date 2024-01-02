import { useForm } from 'react-hook-form';
import { useRegister } from './useRegister';

function RegisterForm() {
  const { register: signup, isLoading } = useRegister();
  const { register, formState, handleSubmit, reset, getValues } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-7 border border-neutral-800 bg-neutral-900 rounded-md py-6 px-10 w-[90%] max-w-[480px]"
    >
      <div className="flex flex-col gap-2 mb-7">
        <label htmlFor="fullName" className="font-semibold">
          Full Name
        </label>

        <input
          {...register('fullName', {
            required: 'Please enter your full name',
          })}
          disabled={isLoading}
          type="text"
          id="fullName"
          className="bg-transparent border border-neutral-500 rounded-md py-2 px-3"
        />
        {errors?.fullName?.message && (
          <p className="text-red-500 text-sm">{errors?.fullName?.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 mb-7">
        <label htmlFor="email" className="font-semibold">
          Email address
        </label>
        <input
          {...register('email', {
            required: 'Please enter your email address',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please provide a valid email address',
            },
          })}
          disabled={isLoading}
          type="email"
          id="email"
          className="bg-transparent border border-neutral-500 rounded-md py-2 px-3"
        />
        {errors?.email?.message && (
          <p className="text-red-500 text-sm">{errors?.email?.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 mb-7">
        <label htmlFor="password" className="font-semibold">
          Password
        </label>
        <input
          {...register('password', {
            required: 'Please enter your password',
            minLength: {
              value: 8,
              message: 'Password needs to be at least 8 characters',
            },
          })}
          disabled={isLoading}
          type="password"
          id="password"
          className="bg-transparent border border-neutral-500 rounded-md py-2 px-3"
        />
        {errors?.password?.message && (
          <p className="text-red-500 text-sm">{errors?.password?.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-semibold">
          Confirm Password
        </label>
        <input
          {...register('passwordConfirm', {
            required: 'Please enter to confirm your password',
            validate: (value) =>
              value === getValues('password') || 'Password need to match',
          })}
          disabled={isLoading}
          type="password"
          id="passwordConfirm"
          className="bg-transparent border border-neutral-500 rounded-md py-2 px-3"
        />
        {errors?.passwordConfirm?.message && (
          <p className="text-red-500 text-sm">
            {errors?.passwordConfirm?.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-7 block w-full bg-green-600 py-2 px-3 rounded-md text-green-50 font-semibold"
      >
        Sign Up
      </button>
    </form>
  );
}

export default RegisterForm;
