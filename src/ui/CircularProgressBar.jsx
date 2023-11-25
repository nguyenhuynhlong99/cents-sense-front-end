import { useEffect, useState } from 'react';

function CircularProgressBar({ percentage = 0, size = 20 }) {
  const [gradientPercentage, setGradientPercentage] = useState(0);

  const progressBarStyle = {
    background: `radial-gradient(closest-side, #181818 79%, transparent 80% 100%), conic-gradient(#21C55D ${gradientPercentage}%, #0a0a0a 0)`,
    width: `${size}px`,
    borderRadius: '50%',
    height: `${size}px`,
    position: 'relative',
  };

  useEffect(() => {
    if (gradientPercentage < percentage) {
      setTimeout(() => setGradientPercentage((prev) => (prev += 2)), 50);
    }
  }, [gradientPercentage, percentage]);

  return <div style={progressBarStyle}></div>;
}

export default CircularProgressBar;
