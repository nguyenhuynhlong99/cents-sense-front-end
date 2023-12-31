import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccounts } from '../accounts/useAccounts';

import MobileOverview from './MobileOverview';
import LargeOverview from './LargeOverview';
import Button from '../../ui/Button';
import Loader from '../../ui/Loader';

function OverviewLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const { accounts, isLoading } = useAccounts();

  const navigate = useNavigate();

  useEffect(() => {
    // set initial value
    const mediaWatcher = window.matchMedia('(max-width: 700px)');
    setIsMobile(mediaWatcher.matches);

    //watch for updates
    function updateIsMobile(e) {
      setIsMobile(e.matches);
    }
    mediaWatcher.addEventListener('change', updateIsMobile);

    // clean up after ourselves
    return function cleanup() {
      mediaWatcher.removeEventListener('change', updateIsMobile);
    };
  }, [setIsMobile]);

  if (isLoading) return <Loader />;

  if (accounts?.length < 1) {
    return (
      <section>
        <p className="text-center text-3xl text-green-500 uppercase font-semibold">
          Welcome to CentSense!
        </p>
        <p className="mt-3 text-center text-lg">
          Let's start your financial journey by tracking and managing all your
          money.
        </p>

        <div className="flex items-center justify-center mt-5">
          <Button onClick={() => navigate('/accounts')}>Let's go!</Button>
        </div>
      </section>
    );
  }

  return <>{isMobile ? <MobileOverview /> : <LargeOverview />}</>;
}

export default OverviewLayout;
