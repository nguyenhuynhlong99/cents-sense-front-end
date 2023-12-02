import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header';

function AppLayout() {
  return (
    <div className="bg-neutral-950">
      <div className="h-[100dvh] max-w-[1300px] m-auto p-3 grid grid-rows-[1fr_auto] lg:grid-rows-none lg:grid-cols-[auto_1fr] lg:gap-3 bg-neutral-950 text-stone-200 lg:p-0">
        <Sidebar />
        <div className="order-1 px-5 py-3 flex flex-col gap-4 lg:order-2 overflow-hidden lg:h-screen lg:py-0 lg:pt-3 lg:pb-7">
          <Header />
          <main className="bg-neutral-900 rounded-lg p-3 grow md:p-8 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
