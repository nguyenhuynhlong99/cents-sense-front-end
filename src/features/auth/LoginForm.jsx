import { useForm } from 'react-hook-form';

import { useLogin } from './useLogin';
import toast from 'react-hot-toast';

function LoginForm() {
  const { login, isLoading } = useLogin();

  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    login(data, {
      onSuccess: () => {
        reset();
        toast.success('Login successfully!');
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-7 border border-neutral-800 bg-neutral-900 rounded-md py-6 px-10 w-[90%] max-w-[480px]"
    >
      <div className="flex flex-col gap-2 mb-7">
        <label htmlFor="email" className="font-semibold">
          Email address
        </label>
        <input
          {...register('email', {
            required: 'Please enter your email address',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address',
            },
          })}
          disabled={isLoading}
          autoComplete="username"
          type="email"
          id="email"
          className="bg-transparent border border-neutral-500 rounded-md py-2 px-3"
        />
        {errors?.email?.message && (
          <p className="text-red-500 text-sm">{errors?.email?.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-semibold">
          Password
        </label>
        <input
          {...register('password', {
            required: 'Please enter your password',
          })}
          disabled={isLoading}
          autoComplete="current-password"
          type="password"
          id="password"
          className="bg-transparent border border-neutral-500 rounded-md py-2 px-3"
        />
        {errors?.password?.message && (
          <p className="text-red-500 text-sm">{errors?.password?.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-7 block w-full bg-green-600 py-2 px-3 rounded-md text-green-50 font-semibold"
      >
        Log in
      </button>
    </form>
  );
}

export default LoginForm;
