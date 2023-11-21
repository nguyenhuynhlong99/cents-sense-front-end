import Heading from '../ui/Heading';
import { useEffect, useState } from 'react';
import MobileOverview from '../features/overview/MobileOverview';
import LargeOverview from '../features/overview/LargeOverview';
import { data } from '../data/data';

function Overview() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // set initial value
    const mediaWatcher = window.matchMedia('(max-width: 600px)');
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

  return (
    <>
      <Heading>Overview</Heading>

      {isMobile ? (
        <MobileOverview data={data} />
      ) : (
        <LargeOverview data={data} />
      )}
    </>
  );
}

export default Overview;
