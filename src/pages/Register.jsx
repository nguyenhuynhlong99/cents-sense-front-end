import RegisterForm from '../features/auth/RegisterForm';
import Logo from '../ui/Logo';

function Register() {
  return (
    <main className="bg-neutral-950 h-[100dvh] text-neutral-100 text-base flex flex-col items-center justify-center">
      <Logo type="login" />
      <h2 className="mt-5 font-semibold text-center text-2xl sm:text-4xl">
        Sign up your new account
      </h2>

      <RegisterForm />
    </main>
  );
}

export default Register;
