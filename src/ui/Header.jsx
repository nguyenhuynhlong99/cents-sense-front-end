import { useUser } from '../features/auth/useUser';

import Logo from './Logo';
import LogOut from '../features/auth/LogOut';

function Header() {
  const { user } = useUser();

  return (
    <header className="flex items-center">
      <div className="block lg:hidden">
        <Logo />
      </div>

      <div className="ml-auto flex items-center">
        <div className="flex items-center gap-3">
          <span className="text-sm sm:text-base">
            Hello,
            <span className="font-bold text-green-500">
              {user?.user_metadata?.fullName}
            </span>
          </span>
          <LogOut />
        </div>
      </div>
    </header>
  );
}

export default Header;
