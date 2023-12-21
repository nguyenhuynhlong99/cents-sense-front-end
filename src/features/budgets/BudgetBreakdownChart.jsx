import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useBudgets } from './useBudgets';
import Loader from '../../ui/Loader';

ChartJS.register(ArcElement, Tooltip, Legend);

function BudgetBreakdownChart({ expectedIncomeId }) {
  const { isLoading, budgets } = useBudgets();

  const monthlyBudgets = getCurrentMonthBudgets();

  const totalBudgetAmount = monthlyBudgets?.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  const topBudgets =
    monthlyBudgets?.length > 3
      ? monthlyBudgets?.sort((a, b) => b.amount - a.amount).slice(0, 3)
      : monthlyBudgets?.sort((a, b) => b.amount - a.amount);

  const topBudgetCategories = topBudgets?.map((b) => b.category);
  const topBudgetAmount = topBudgets?.map((b) => b.amount);
  const totalTopBudgetAmount = topBudgetAmount?.reduce(
    (acc, curr) => acc + curr,
    0
  );

  function getCurrentMonthBudgets() {
    return budgets?.filter((b) => b?.expectedIncomeId === expectedIncomeId);
  }

  let pieChartData;
  let pieChartLabels;
  let pieChartAmountData;

  if (topBudgetCategories && topBudgetAmount) {
    pieChartLabels =
      topBudgetCategories?.length > 4
        ? [...topBudgetCategories, 'Rest']
        : [...topBudgetCategories];

    pieChartAmountData =
      topBudgetAmount?.length > 4
        ? [...topBudgetAmount, totalBudgetAmount - totalTopBudgetAmount]
        : [...topBudgetAmount];
  }

  if (pieChartLabels && pieChartAmountData) {
    pieChartData = {
      labels: pieChartLabels,
      datasets: [
        {
          label: 'Amount of money',
          data: pieChartAmountData,
          backgroundColor: [
            '#191A19',
            '#1E5128',
            '#4E9F3D',
            '#8ce99a',
            '#D8E9A8',
          ],
          borderColor: ['#20B156', '#20B156', '#20B156', '#20B156', '#20B156'],
          borderWidth: 1,
        },
      ],
    };
  }

  if (isLoading) return <Loader />;

  return <>{pieChartData && <Doughnut data={pieChartData} />}</>;
}

export default BudgetBreakdownChart;
