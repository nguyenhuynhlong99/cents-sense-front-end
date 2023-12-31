import { useBudgets } from './useBudgets';
import { useExpectedIncome } from './useExpectedIncome';

import BudgetBreakdownChart from './BudgetBreakdownChart';

function BudgetBreakdown() {
  const { expectedIncome } = useExpectedIncome();
  const { budgets } = useBudgets();

  const expectedIncomeId = expectedIncome?.id;
  const monthlyBudgets = getCurrentMonthBudgets();

  function getCurrentMonthBudgets() {
    return budgets?.filter((b) => b?.expectedIncomeId === expectedIncomeId);
  }

  if (monthlyBudgets?.length < 1) return null;

  return (
    <div className="mt-5 p-5 bg-neutral-950 rounded-md">
      <h3 className="text-lg mb-3 md:text-xl">Budgets Breakdown</h3>
      <div className="h-[200px] flex items-center justify-center sm:h-[300px] md:h-[400px]">
        <BudgetBreakdownChart monthlyBudgets={monthlyBudgets} />
      </div>
    </div>
  );
}

export default BudgetBreakdown;
