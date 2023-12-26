import BudgetCard from './BudgetCard';
import { LoaderIcon } from 'react-hot-toast';
import { useUser } from '../auth/useUser';
import { getMonth, getYear, parseISO } from 'date-fns';
import { currentMonth, currentYear } from '../../utils/helpers';
import Icon from '../../ui/Icon';

function MonthlyBudgetUsage() {
  const { user, isLoading } = useUser();

  const monthlyBudgets = getMonthlyBudgets();

  function getMonthlyBudgets() {
    const expectedIncomeId = user?.expectedIncomes?.find(
      (item) =>
        getYear(parseISO(item.createdAt)) === currentYear &&
        getMonth(parseISO(item.createdAt)) === currentMonth
    )?.id;

    return user?.budgets?.filter(
      (b) => b.expectedIncomeId === expectedIncomeId
    );
  }

  function getTotalUsedBudget(budgetId) {
    return user?.transactions
      ?.filter((t) => t.budgetId === budgetId)
      .reduce((acc, curr) => acc + curr.amount, 0);
  }

  if (isLoading) return <LoaderIcon />;

  if (monthlyBudgets?.length < 1) return null;

  return (
    <section className="mb-4 bg-neutral-950 p-3 rounded-lg">
      <h3 className="text-lg mb-2">Monthly Budget Usage</h3>
      <div className="grid grid-cols-2 gap-4">
        {monthlyBudgets.map((budget) => (
          <BudgetCard
            key={budget.id}
            icon={<Icon name={budget.icon} />}
            category={budget.category}
            usedBudget={getTotalUsedBudget(budget.id)}
            totalBudget={budget.amount}
          />
        ))}
      </div>
    </section>
  );
}

export default MonthlyBudgetUsage;
