import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function BudgetBreakdownChart({ monthlyBudgets }) {
  const totalBudgetAmount = useMemo(() => {
    monthlyBudgets?.reduce((acc, curr) => acc + curr.amount, 0);
  }, [monthlyBudgets]);

  const topBudgets = useMemo(() => {
    monthlyBudgets?.length > 3
      ? monthlyBudgets?.sort((a, b) => b.amount - a.amount).slice(0, 3)
      : monthlyBudgets?.sort((a, b) => b.amount - a.amount);
  }, [monthlyBudgets]);

  const topBudgetCategories = topBudgets?.map((b) => b.category);
  const topBudgetAmount = topBudgets?.map((b) => b.amount);

  const totalTopBudgetAmount = useMemo(() => {
    topBudgetAmount?.reduce((acc, curr) => acc + curr, 0);
  }, [topBudgetAmount]);

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

  return <>{pieChartData && <Doughnut data={pieChartData} />}</>;
}

export default BudgetBreakdownChart;
