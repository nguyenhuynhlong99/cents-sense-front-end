import { parseISO } from 'date-fns';
import Icon from '../../ui/Icon';
import { useUser } from '../auth/useUser';
import TransactionCard from './TransactionCard';

function OverviewTransactions() {
  const userId = 1;
  const { user } = useUser(userId);

  const userRecentTransactions = user?.transactions?.sort(
    (a, b) => new Date(parseISO(b.date)) - new Date(parseISO(a.date))
  );
  function getIcon(budgetId) {
    if (budgetId !== 0) {
      const iconName = user?.budgets?.find((b) => b.id === budgetId).icon;
      return <Icon name={iconName} />;
    }

    return <Icon />;
  }

  return (
    <section className="bg-neutral-950 rounded-md p-3">
      <h3 className="text-lg mb-2">Recent Transactions</h3>
      <div className="grid grid-cols-1 divide-y divide-slate-700 text-sm">
        {userRecentTransactions?.map((t) => (
          <TransactionCard
            key={t.id}
            type={t.type}
            detail={t.description}
            icon={getIcon(t.budgetId)}
            amountMoney={t.amount}
            date={new Date(t.date).toDateString()}
          />
        ))}
      </div>
    </section>
  );
}

export default OverviewTransactions;
