import { getMonth, getYear, parseISO } from 'date-fns';
import { currentMonth, currentYear } from '../../utils/helpers';
import { useUser } from '../auth/useUser';
import BudgetBreakdownChart from './BudgetBreakdownChart';

function BudgetBreakdown() {
  const { user } = useUser();

  const expectedIncomeId = user?.expectedIncomes?.find(
    (item) =>
      getYear(parseISO(item.createdAt)) === currentYear &&
      getMonth(parseISO(item.createdAt)) === currentMonth
  )?.id;
  const monthlyBudgets = getCurrentMonthBudgets();

  function getCurrentMonthBudgets() {
    return user?.budgets?.filter(
      (b) => b?.expectedIncomeId === expectedIncomeId
    );
  }

  if (monthlyBudgets?.length < 1) return null;

  return (
    <div className="mt-5 p-5 bg-neutral-950 rounded-md">
      <h3 className="text-lg mb-3 md:text-xl">Budgets Breakdown</h3>
      <div className="h-[200px] flex items-center justify-center sm:h-[300px] md:h-[400px]">
        <BudgetBreakdownChart
          expectedIncomeId={expectedIncomeId}
          monthlyBudgets={monthlyBudgets}
        />
      </div>
    </div>
  );
}

export default BudgetBreakdown;
