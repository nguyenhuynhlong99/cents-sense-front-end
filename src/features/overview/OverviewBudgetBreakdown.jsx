import { getMonth, getYear, parseISO } from 'date-fns';
import { useUser } from '../auth/useUser';
import { currentMonth, currentYear } from '../../utils/helpers';
import BudgetBreakdownChart from '../budgets/BudgetBreakdownChart';

function OverviewBudgetBreakdown() {
  const userId = 1;
  const { user } = useUser();

  const expectedIncomeId = user?.expectedIncomes?.find(
    (item) =>
      getYear(parseISO(item.createdAt)) === currentYear &&
      getMonth(parseISO(item.createdAt)) === currentMonth
  ).id;

  return (
    <section className="bg-neutral-950 p-3 rounded-md text-sm">
      <h3 className="text-lg mb-3">Monthly Budget Breakdown</h3>

      <div className="max-h-[280px] flex items-center justify-center">
        <BudgetBreakdownChart expectedIncomeId={expectedIncomeId} />
      </div>
    </section>
  );
}

export default OverviewBudgetBreakdown;
