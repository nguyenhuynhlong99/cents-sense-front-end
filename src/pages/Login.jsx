import LoginForm from '../features/auth/LoginForm';
import Logo from '../ui/Logo';

function Login() {
  return (
    <main className="bg-neutral-950 h-[100dvh] text-neutral-100 text-base">
      <div className="flex flex-col items-center justify-center h-full">
        <Logo type="login" />

        <h2 className="mt-5 font-semibold text-center text-2xl sm:text-4xl">
          Log in to your account
        </h2>

        <LoginForm />
      </div>
    </main>
  );
}

export default Login;
