import BudgetBreakdownChart from './BudgetBreakdownChart';

function BudgetBreakdown({ expectedIncomeId }) {
  return (
    <div className="mt-5 p-5 bg-neutral-950 rounded-md">
      <h3 className="text-lg mb-3 md:text-xl">Budgets Breakdown</h3>
      <div className="h-[200px] flex items-center justify-center sm:h-[300px] md:h-[400px]">
        <BudgetBreakdownChart expectedIncomeId={expectedIncomeId} />
      </div>
    </div>
  );
}

export default BudgetBreakdown;
