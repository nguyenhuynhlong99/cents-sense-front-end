import { getMonth, parseISO } from 'date-fns';

import TransactionCard from './TransactionCard';
import GoalCard from './GoalCard';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Basket, CreditCard, Television } from '@phosphor-icons/react';
import MonthlySummary from './MonthlySummary';
import MonthlyBudgetUsage from './MonthlyBudgetUsage';

ChartJS.register(ArcElement, Tooltip, Legend);

function LargeOverview({ data }) {
  const userID = 1;
  const { transactions, budgets, savingsGoals } = data;
  // const userAccounts = accounts.filter((acc) => acc.userID === userID);
  const currentMonth = getMonth(new Date());
  // const userIncome = getUserIncome(userID);
  // const userExpense = getUserExpense(userID);
  // const userSaving = userIncome - userExpense;
  const monthlyBudgets = getMonthlyBudgets(userID, currentMonth);
  const giveDateForTransactions = transactions.map((t) => {
    return { ...t, date: new Date(t.date) };
  });
  const recentTransactions = giveDateForTransactions.sort(
    (a, b) => b.date - a.date
  );
  const recentTransactionsWithBudgetCategory = recentTransactions.map((t) => ({
    ...t,
    budgetCategory: findBudgetCategoryWithBudgetID(t.budgetID),
  }));

  const totalBudgetAmount = monthlyBudgets.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  const topBudgets =
    monthlyBudgets.length > 3
      ? monthlyBudgets.sort((a, b) => b.amount - a.amount).slice(0, 3)
      : monthlyBudgets.sort((a, b) => b.amount - a.amount);

  const topBudgetCategories = topBudgets.map((b) => b.category);
  const topBudgetAmount = topBudgets.map((b) => b.amount);
  const totalTopBudgetAmount = topBudgetAmount.reduce(
    (acc, curr) => acc + curr,
    0
  );

  const pieChartData = {
    labels: [...topBudgetCategories, 'Rest'],
    datasets: [
      {
        label: 'Amount of money',
        data: [...topBudgetAmount, totalBudgetAmount - totalTopBudgetAmount],
        backgroundColor: ['#191A19', '#1E5128', '#4E9F3D', '#D8E9A8'],
        borderColor: ['#20B156', '#20B156', '#20B156', '#20B156'],
        borderWidth: 1,
      },
    ],
  };

  function getUserIncome(userID) {
    return transactions
      .filter((t) => t.userID === userID)
      .filter((item) => item.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0);
  }

  function getUserExpense(userID) {
    return transactions
      .filter((t) => t.userID === userID)
      .filter((item) => item.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);
  }

  function getMonthlyBudgets(userID, month) {
    return budgets
      .filter((b) => b.userID === userID)
      .filter((b) => getMonth(parseISO(b.createdAt)) === month);
  }

  function getUsedBudget(userID, budgetID) {
    const monthlyTransactions = transactions.filter(
      (t) => getMonth(parseISO(t.date)) === currentMonth
    );

    return monthlyTransactions
      .filter((t) => t.userID === userID)
      .filter((b) => b.budgetID === budgetID)
      .reduce((acc, curr) => acc + curr.amount, 0);
  }

  function findBudgetCategoryWithBudgetID(budgetID) {
    if (!budgetID) return;
    const budget = budgets.find((b) => b.budgetID === budgetID);
    return budget.category;
  }

  function getIcon(category) {
    switch (category) {
      case 'food':
        return <Basket size={20} />;

      case 'entertainment':
        return <Television size={20} />;

      default:
        return <CreditCard size={20} />;
    }
  }

  return (
    <div className="text-base mt-4">
      {/* Summary */}
      <section className="mb-4">
        <MonthlySummary />
      </section>

      <div className="grid grid-cols-2 gap-3">
        <div>
          {/* Budget */}
          <MonthlyBudgetUsage />

          {/* Transaction */}
          <section className="bg-neutral-950 rounded-md p-3">
            <h3 className="text-lg mb-2">Recent Transactions</h3>
            <div className="grid grid-cols-1 divide-y divide-slate-700 text-sm">
              {recentTransactionsWithBudgetCategory.map((t) => (
                <TransactionCard
                  key={t.id}
                  type={t.type}
                  detail={t.description}
                  icon={getIcon(t.budgetCategory)}
                  amountMoney={t.amount}
                  date={new Date(t.date).toDateString()}
                />
              ))}
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-3">
          {/* Budget Distribution */}
          <section className="bg-neutral-950 p-3 rounded-md text-sm">
            <h3 className="text-lg mb-3">Monthly Budget Distribution</h3>

            <div className="max-h-[280px] flex items-center justify-center">
              <Doughnut data={pieChartData} />
            </div>
          </section>

          {/* Goals */}
          <section className="bg-neutral-950 p-3 rounded-md text-sm">
            <h3 className="text-lg mb-3">Saving Goals</h3>

            <div className="flex flex-col divide-y divide-slate-700">
              {savingsGoals.map((goal) => (
                <GoalCard
                  name={goal.name}
                  currentAmount={goal.currentAmount}
                  targetAmount={goal.targetAmount}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default LargeOverview;
