import { useSearchParams } from 'react-router-dom';
import Heading from '../../ui/Heading';
import TransactionTable from './TransactionTable';
import Filter from '../../ui/Filter';

function TransactionLayout() {
  const [searchParams, setSearchParams] = useSearchParams();

  function onSearchType(value) {
    searchParams.set('type', value);
    setSearchParams(searchParams);
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Heading>Transactions</Heading>

        <Filter
          filterField="type"
          options={[
            { value: 'all', label: 'All' },
            { value: 'income', label: 'Income' },
            { value: 'expense', label: 'Expense' },
            { value: 'saving', label: 'Saving' },
          ]}
        />
      </div>

      <TransactionTable />
    </>
  );
}

export default TransactionLayout;
