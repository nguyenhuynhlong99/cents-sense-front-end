import { SignOut } from '@phosphor-icons/react';
import Logo from './Logo';
import { logout } from '../services/apiUsers';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/auth/useUser';

function Header() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <header className="flex items-center">
      <div className="block lg:hidden">
        <Logo />
      </div>

      <div className="ml-auto flex items-center">
        <div className="flex items-center gap-3">
          <span className="text-sm sm:text-base">
            Hello,
            <span className="font-bold text-green-500"> {user?.fullName}</span>
          </span>
          <span
            className="cursor-pointer"
            onClick={() => {
              logout();
              navigate('login');
            }}
          >
            <SignOut color="#22c55f" />
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
