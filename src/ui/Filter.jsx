import { useSearchParams } from 'react-router-dom';

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get('page')) searchParams.set('page', 1);
    setSearchParams(searchParams);
  }

  const activeStyle = {
    color: 'rgb(240,253,244)',
    backgroundColor: 'rgb(22,163,74)',
  };

  return (
    <div className="mx-auto bg-neutral-950 p-1 rounded-md shadow-sm flex items-center w-[300px] max-w-full sm:mx-0 sm:gap-2">
      {options.map((opt) => (
        <button
          className="basis-[calc(100%/4)] bg-neutral-950 border-0 rounded-md font-medium text-xs py-2 transition-all duration-[300ms] hover:bg-green-600 hover:text-green-50 sm:text-sm"
          onClick={() => handleClick(opt.value)}
          style={opt.value === currentFilter ? activeStyle : null}
          disabled={opt.value === currentFilter}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
