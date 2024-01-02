import { useNavigate } from 'react-router-dom';
import RegisterForm from '../features/auth/RegisterForm';
import Logo from '../ui/Logo';

function Register() {
  const navigate = useNavigate();

  return (
    <main className="bg-neutral-950 h-[100dvh] text-neutral-100 text-base flex flex-col items-center justify-center">
      <Logo type="login" />
      <h2 className="mt-5 font-semibold text-center text-2xl sm:text-4xl">
        Sign up your new account
      </h2>

      <RegisterForm />

      <div className="flex gap-2 mt-3">
        <span className="text-neutral-400">Already have an account?</span>
        <button
          className="text-green-500 font-semibold"
          onClick={() => navigate('/login')}
        >
          Log in
        </button>
      </div>
    </main>
  );
}

export default Register;
