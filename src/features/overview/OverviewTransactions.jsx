import { parseISO } from 'date-fns';
import Icon from '../../ui/Icon';
// import { useUser } from '../auth/useUser';
import TransactionCard from './TransactionCard';
import { useTransactions } from '../transactions/useTransactions';

function OverviewTransactions() {
  // const { user } = useUser();
  const { transactions } = useTransactions();

  const userRecentTransactions = transactions?.sort(
    (a, b) =>
      new Date(parseISO(b.created_at)) - new Date(parseISO(a.created_at))
  );

  if (transactions?.length < 1) return null;

  return (
    <section className="bg-neutral-950 rounded-md p-3">
      <h3 className="text-lg mb-2">Recent Transactions</h3>
      <div className="grid grid-cols-1 divide-y divide-slate-700 text-sm">
        {userRecentTransactions?.map((t) => (
          <TransactionCard
            key={t.id}
            type={t.type}
            detail={t.description}
            icon={<Icon name={t?.budgets?.icon} />}
            amountMoney={t.amount}
            date={new Date(t.created_at).toDateString()}
          />
        ))}
      </div>
    </section>
  );
}

export default OverviewTransactions;
