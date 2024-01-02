import { SignOut } from '@phosphor-icons/react';
import { useLogout } from './useLogout';

function LogOut() {
  const { logout, isLoading } = useLogout();

  return (
    <button
      className="block p-1 rounded-md hover:bg-neutral-800"
      onClick={logout}
      disabled={isLoading}
    >
      <SignOut color="#22c55f" />
    </button>
  );
}

export default LogOut;
