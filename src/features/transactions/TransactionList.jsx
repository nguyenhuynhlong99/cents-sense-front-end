import { useTransactionsExpandAccountAndBudget } from './useTransactionsExpandAccountsAndBudget';

import Loader from '../../ui/Loader';
import TransactionItem from './TransactionItem';

function TransactionList() {
  const userId = 1;

  const { transactionsExpandAccountBudget, isLoading } =
    useTransactionsExpandAccountAndBudget();

  const recentTransactions = getRecentTransactions();

  function getRecentTransactions() {
    return transactionsExpandAccountBudget
      ?.filter((t) => t.userId === userId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  if (isLoading) return <Loader />;

  return (
    <div className="rounded-md p-5 text-base mt-5">
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,calc(100%/3-0.5rem)))] gap-3 justify-center lg:justify-normal">
        {recentTransactions.map((t) => (
          <TransactionItem key={t.id} transaction={t} />
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
