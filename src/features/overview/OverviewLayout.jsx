import { useEffect, useState } from 'react';
import MobileOverview from './MobileOverview';
import LargeOverview from './LargeOverview';

import { data } from '../../../data/data';

function OverviewLayout() {
  const [isMobile, setIsMobile] = useState(false);

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

  return <>{isMobile ? <MobileOverview data={data} /> : <LargeOverview />}</>;
}

export default OverviewLayout;
