import MonthlySummary from './MonthlySummary';
import MonthlyBudgetUsage from './MonthlyBudgetUsage';
import OverviewBudgetBreakdown from './OverviewBudgetBreakdown';
import OverviewGoals from './OverviewGoals';
import OverviewTransactions from './OverviewTransactions';
import { useUser } from '../auth/useUser';
import { getMonth, getYear, parseISO } from 'date-fns';
import { currentMonth, currentYear } from '../../utils/helpers';
import { LoaderIcon } from 'react-hot-toast';

import Button from '../../ui/Button';

function LargeOverview() {
  const { user, isLoading } = useUser();

  // const isHavingMonthlyExpectedIncome =
  //   user?.expectedIncomes?.findIndex(
  //     (inc) =>
  //       getYear(parseISO(inc.createdAt)) === currentYear &&
  //       getMonth(parseISO(inc.createdAt)) === currentMonth
  //   ) !== -1
  //     ? true
  //     : false;

  // if (user?.expectedIncomes && !isHavingMonthlyExpectedIncome)
  //   return (
  //     <div>
  //       <p>It's a new month. Yes it is</p>
  //       <p>Let's start it by setting your expected income</p>
  //     </div>
  //   );

  if (isLoading) return LoaderIcon;

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
