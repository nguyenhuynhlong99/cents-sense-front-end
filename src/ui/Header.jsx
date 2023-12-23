import { SignOut } from '@phosphor-icons/react';
import Logo from './Logo';
import { logout } from '../services/apiUsers';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center">
      <div className="block lg:hidden">
        <Logo />
      </div>

      <div className="ml-auto flex items-center">
        {/* <div className="border rounded-full w-[40px] sm:w-[50px]">
          <img
            className="w-[40px] sm:w-[50px] rounded-full"
            src="./notion-avatar-1699487912354.png"
            alt="notion avatar"
          />
        </div> */}

        <div className="flex items-center gap-5">
          <span className="text-base">
            Hello, <span className="font-bold text-green-500">Long Nguyen</span>
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
