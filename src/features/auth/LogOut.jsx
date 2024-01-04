import { useLogout } from './useLogout';
import { SignOut } from '@phosphor-icons/react';

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
