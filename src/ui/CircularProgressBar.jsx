function CircularProgressBar({ percentage = 0, size = 20 }) {
  const style = {
    background: `radial-gradient(closest-side, #0a0a0a 79%, transparent 80% 100%), conic-gradient(#21C55D ${percentage}%, rgb(38,38,38) 0)`,
    width: `${size}px`,
    borderRadius: '50%',
    height: `${size}px`,
  };

  return <div style={style}></div>;
}

export default CircularProgressBar;
