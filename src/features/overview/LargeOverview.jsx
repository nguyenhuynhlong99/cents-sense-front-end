import {
  Basket,
  CreditCard,
  Television,
  TrendDown,
  TrendUp,
} from '@phosphor-icons/react';
import AccountCard from '../../ui/AccountCard';
import BudgetCard from './BudgetCard';
import TransactionCard from './TransactionCard';
import { formatCurrency } from '../../utils/helpers';
import { getMonth, parseISO } from 'date-fns';
import GoalCard from './GoalCard';

function LargeOverview({ data }) {
  const userID = 1;
  const { transactions, budgets, accounts, savingsGoals } = data;
  const userAccounts = accounts.filter((acc) => acc.userID === userID);
  const currentMonth = getMonth(new Date());
  const userIncome = getUserIncome(userID);
  const userExpense = getUserExpense(userID);
  const userSaving = userIncome - userExpense;
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
        return <Basket />;

      case 'entertainment':
        return <Television />;

      default:
        return <CreditCard />;
    }
  }

  return (
    <div className="text-base">
      <div className="grid grid-cols-[60%,40%] gap-3">
        <div>
          {/* Summary */}
          <section className="mb-3">
            <h3 className="text-lg mb-2">Monthly Summary</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-neutral-950 rounded-md pl-4 py-2">
                <div className="flex flex-col gap-2">
                  <span className="">Income</span>
                  <span className="text-lg font-bold">
                    {formatCurrency(userIncome)}
                  </span>
                  <span className="text-green-400 text-xs flex gap-1">
                    <TrendUp /> +10% from last month
                  </span>
                </div>
              </div>
              <div className="bg-neutral-950 rounded-md pl-4 py-2">
                <div className="flex flex-col gap-2">
                  <span className="text-sm">Expense</span>
                  <span className="text-lg font-bold">
                    {formatCurrency(userExpense)}
                  </span>
                  <span className="text-red-500 text-xs flex gap-1">
                    <TrendUp /> +10% from last month
                  </span>
                </div>
              </div>
              <div className="bg-neutral-950 rounded-md pl-4 py-2">
                <div className="flex flex-col gap-2">
                  <span className="text-sm">Saving</span>
                  <span className="text-lg font-bold">
                    {formatCurrency(userSaving)}
                  </span>
                  <span className="text-red-500 text-xs flex self-center gap-1">
                    <TrendDown /> -10% from last month
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Budget */}
          <section className="mb-8">
            <h3 className="text-lg mb-2">Monthly Budget</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {monthlyBudgets.map((budget) => (
                <BudgetCard
                  icon={getIcon(budget.category)}
                  category={budget.category}
                  usedBudget={getUsedBudget(userID, budget.budgetID)}
                  totalBudget={budget.amount}
                />
              ))}
            </div>
          </section>

          {/* Transaction */}
          <section className="bg-neutral-950 rounded-md p-3">
            <h3 className="text-lg mb-2">Recent Transactions</h3>

            <div className="grid grid-cols-1 divide-y divide-slate-700 text-sm">
              {recentTransactionsWithBudgetCategory.map((t) => (
                <TransactionCard
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

        <div className="px-3">
          {/* Account */}
          <section className="bg-neutral-950 rounded-md p-5">
            <h3 className="text-lg mb-2">Accounts</h3>

            <div className="max-w-[300px] m-auto">
              <AccountCard
                balance={userAccounts[0].balance}
                name={userAccounts[0].name}
              />
            </div>

            <div className="mt-3 pl-3 bg-neutral-950 flex flex-col gap-2 text-sm">
              <span className="capitalize">
                Card Type: {userAccounts[0].type}
              </span>
              <span className="flex gap-2">
                <span>Balance:</span>
                <span className="flex gap-1 text-green-400">
                  <TrendUp /> +10% from last month
                </span>
              </span>
            </div>
          </section>

          {/* Goals */}
          <section className="bg-neutral-950 p-3 rounded-md mt-4 text-sm">
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
