import { useEffect, useState } from 'react';

function ProgressBar({ height = 10, percentage = 0 }) {
  const [width, setWidth] = useState(0);

  const style = {
    display: 'block',
    height: `${height}px`,
    width: `${width}%`,
  };

  useEffect(() => {
    if (width <= percentage) {
      setTimeout(() => setWidth((prev) => (prev += 2)), 50);
    }
  }, [percentage, width]);

  return (
    <div className="bg-neutral-900 rounded-lg">
      <span
        style={style}
        className="bg-green-500 rounded-lg transition-[width] duration-500 ease-out"
      ></span>
    </div>
  );
}

export default ProgressBar;
