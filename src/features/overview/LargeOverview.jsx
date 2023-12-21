import MonthlySummary from './MonthlySummary';
import MonthlyBudgetUsage from './MonthlyBudgetUsage';
import OverviewBudgetBreakdown from './OverviewBudgetBreakdown';
import OverviewGoals from './OverviewGoals';
import OverviewTransactions from './OverviewTransactions';

function LargeOverview({ data }) {
  return (
    <div className="text-base mt-4">
      <section className="mb-4">
        <MonthlySummary />
      </section>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <MonthlyBudgetUsage />

          <OverviewTransactions />
        </div>

        <div className="flex flex-col gap-3">
          <OverviewBudgetBreakdown />

          <OverviewGoals />
        </div>
      </div>
    </div>
  );
}

export default LargeOverview;
