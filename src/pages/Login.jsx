import { useNavigate } from 'react-router-dom';
import LoginForm from '../features/auth/LoginForm';
import Logo from '../ui/Logo';

function Login() {
  const navigate = useNavigate();

  return (
    <main className="bg-neutral-950 h-[100dvh] text-neutral-100 text-base flex flex-col items-center justify-center">
      <Logo type="login" />

      <h2 className="mt-5 font-semibold text-center text-2xl sm:text-4xl">
        Log in to your account
      </h2>

      <LoginForm />

      <div className="flex gap-2 mt-3">
        <span className="text-neutral-400">Don't have an account?</span>
        <button
          className="text-green-500 font-semibold"
          onClick={() => navigate('/register')}
        >
          Sign up
        </button>
      </div>
    </main>
  );
}

export default Login;
