import { useExpectedIncome } from '../budgets/useExpectedIncome';
import { useBudgets } from '../budgets/useBudgets';
import BudgetBreakdownChart from '../budgets/BudgetBreakdownChart';

function OverviewBudgetBreakdown() {
  const { expectedIncome } = useExpectedIncome();
  const { budgets } = useBudgets();

  const expectedIncomeId = expectedIncome?.id;
  const monthlyBudgets = getCurrentMonthBudgets();

  function getCurrentMonthBudgets() {
    return budgets?.filter((b) => b?.expectedIncomeId === expectedIncomeId);
  }

  if (monthlyBudgets?.length < 1) return null;

  return (
    <section className="bg-neutral-950 p-3 rounded-md text-sm">
      <h3 className="text-lg mb-3">Monthly Budget Breakdown</h3>

      <div className="max-h-[280px] flex items-center justify-center">
        <BudgetBreakdownChart
          expectedIncomeId={expectedIncomeId}
          monthlyBudgets={monthlyBudgets}
        />
      </div>
    </section>
  );
}

export default OverviewBudgetBreakdown;
