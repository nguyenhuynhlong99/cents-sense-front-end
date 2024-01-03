import BudgetCard from './BudgetCard';
import { useExpectedIncome } from '../budgets/useExpectedIncome';
import { useTransactions } from '../transactions/useTransactions';
import { useBudgets } from '../budgets/useBudgets';
import { LoaderIcon } from 'react-hot-toast';
// import { useUser } from '../auth/useUser';
import Icon from '../../ui/Icon';

function MonthlyBudgetUsage() {
  // const { user, isLoading } = useUser();
  const { expectedIncome, isLoading } = useExpectedIncome();
  const { budgets } = useBudgets();
  const { transactions } = useTransactions();

  const monthlyBudgets = getMonthlyBudgets();

  function getMonthlyBudgets() {
    const expectedIncomeId = expectedIncome?.id;

    return budgets?.filter((b) => b.expectedIncomeId === expectedIncomeId);
  }

  function getTotalUsedBudget(budgetId) {
    return transactions
      ?.filter((t) => t?.budgets?.id === budgetId)
      .reduce((acc, curr) => acc + curr.amount, 0);
  }

  if (isLoading) return <LoaderIcon />;

  if (monthlyBudgets?.length < 1) return null;

  return (
    <section className="mb-4 bg-neutral-950 p-3 rounded-lg">
      <h3 className="text-lg mb-2">Monthly Budget Usage</h3>
      <div className="grid grid-cols-2 gap-4">
        {monthlyBudgets?.map((budget) => (
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
