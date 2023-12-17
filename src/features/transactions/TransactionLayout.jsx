import Heading from '../../ui/Heading';
import Filter from '../../ui/Filter';
import Button from '../../ui/Button';
import TransactionList from './TransactionList';
import { useState } from 'react';
import AddTransaction from './AddTransaction';

function TransactionLayout() {
  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <Heading>Transactions</Heading>
        <Button onClick={() => setOpenAddModal(true)}>
          <span className="hidden sm:block">Add a transaction</span>
          <span className="sm:hidden">Add &#x2B;</span>
        </Button>
      </div>

      <div className="mt-5 flex items-center justify-center">
        <Filter
          filterField="type"
          options={[
            { value: 'all', label: 'All' },
            { value: 'income', label: 'Income' },
            { value: 'expense', label: 'Expense' },
            { value: 'transfer', label: 'Transfer' },
          ]}
        />
      </div>

      <TransactionList />

      <AddTransaction
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      />
    </>
  );
}

export default TransactionLayout;
