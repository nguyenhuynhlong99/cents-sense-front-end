import { useTransactions } from './useTransactions';
import Loader from '../../ui/Loader';
import TransactionItem from './TransactionItem';

function TransactionList() {
  const { transactions, isLoading } = useTransactions();

  const recentTransactions = getRecentTransactions();

  function getRecentTransactions() {
    return transactions?.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }

  if (isLoading) return <Loader />;

  return (
    <div className="rounded-md p-5 text-base mt-5">
      {recentTransactions?.length > 0 ? (
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,calc(100%/3-0.5rem)))] gap-3 justify-center lg:justify-normal">
          {recentTransactions.map((t) => (
            <TransactionItem key={t.id} transaction={t} />
          ))}
        </ul>
      ) : (
        <div className="lg:flex lg:items-center lg:gap-2">
          <img
            className="max-w-[280px] m-auto sm:max-w-[320px] lg:max-w-[380px]"
            src="E-Wallet-pana.svg"
            alt="manage your transactions"
          />
          <div className="text-center lg:text-left">
            <h3 className="text-green-500 text-base font-semibold mb-1 sm:text-lg lg:text-2xl">
              Track your financial journey, one transaction at a time
            </h3>
            <p className="text-xs sm:text-sm lg:text-base">
              Start recording your transactions to paint a clear picture of your
              financial landscape. Every detail counts towards your financial
              success!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
