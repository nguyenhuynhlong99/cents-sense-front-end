import AccountCard from '../../ui/AccountCard';
import {
  ArrowCircleDown,
  ArrowCircleUp,
  Basket,
  CreditCard,
  Money,
  PiggyBank,
  Television,
} from '@phosphor-icons/react';
import MobileSummaryCard from './MobileSummaryCard';
import { formatCurrency } from '../../utils/helpers';
import { getMonth, parseISO } from 'date-fns';
import MobileTransactionCard from './MobileTransactionCard';

function MobileOverview({ data }) {
  const userID = 1;
  const { accounts, transactions, budgets } = data;
  const currentMonth = getMonth(new Date());
  const userAccounts = accounts.filter((acc) => acc.userID === userID);
  const userTotalBalance = getUserTotalBalance(userID);
  const userMonthlyTransactions = transactions.filter(
    (t) => getMonth(parseISO(t.date)) === currentMonth && t.userID === userID
  );
  const userMonthlyIncome = getMonthlyTransactionsOnType('income');
  const userMonthlyExpense = getMonthlyTransactionsOnType('expense');
  const userMonthlyBudgetsAmount = budgets
    .filter((b) => b.userID === userID && getMonth(parseISO(b.createdAt)))
    .reduce((acc, curr) => acc + curr.amount, 0);
  const userMonthlySavings = userMonthlyIncome - userMonthlyExpense;

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

  function getUserTotalBalance(userID) {
    return userAccounts.reduce((acc, curr) => acc + curr.balance, 0);
  }

  function getMonthlyTransactionsOnType(type) {
    return userMonthlyTransactions
      .filter((t) => t.type === type)
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
    <>
      <div className="max-w-[300px] m-auto pt-3">
        <section className="mb-4">
          <h3 className="text-base font-medium mb-2">
            Total Balance:{' '}
            <span className="text-xl text-green-500">
              {formatCurrency(userTotalBalance)}
            </span>
          </h3>

          <AccountCard
            name={userAccounts[0].name}
            balance={userAccounts[0].balance}
          />
        </section>

        <section className="mb-4">
          <h3 className="text-base font-medium mb-2">Monthly Summary</h3>

          <div className="grid grid-cols-2 gap-2">
            <MobileSummaryCard
              name="income"
              amount={userMonthlyIncome}
              icon={<ArrowCircleUp color="#1E51D9" size={35} />}
            />

            <MobileSummaryCard
              name="Expense"
              amount={userMonthlyExpense}
              icon={<ArrowCircleDown color="#eb001b" size={35} />}
            />

            <MobileSummaryCard
              name="Budget"
              amount={userMonthlyBudgetsAmount}
              icon={<Money color="#21c55d" size={35} />}
            />

            <MobileSummaryCard
              name="Saving"
              amount={userMonthlySavings}
              icon={<PiggyBank color="#F9DF4A" size={40} />}
            />
          </div>
        </section>

        <section>
          <h3 className="text-base font-medium mb-2">Recent Transactions</h3>

          <div className="flex flex-col gap-2">
            {recentTransactionsWithBudgetCategory.map((t) => (
              <MobileTransactionCard
                type={t.type}
                description={t.description}
                icon={getIcon(t.budgetCategory)}
                amount={t.amount}
              />
            ))}

            {/* <div className="bg-neutral-950 rounded-md py-2 px-3 flex items-center">
              <Basket color="#fff" />

              <span className="inline-block ml-2 text-base">Groceries</span>
              <span className="text-base ml-auto text-red-600">-$50</span>
            </div>

            <div className="bg-neutral-950 rounded-md py-2 px-3 flex items-center">
              <Barbell color="#fff" />

              <span className="inline-block ml-2 text-base">Gym</span>
              <span className="text-base ml-auto text-red-600">-$50</span>
            </div>

            <div className="bg-neutral-950 rounded-md py-2 px-3 flex items-center">
              <Television color="#fff" />

              <span className="inline-block ml-2 text-base">Netflix</span>
              <span className="text-base ml-auto text-red-600">-$50</span>
            </div>

            <div className="bg-neutral-950 rounded-md py-2 px-3 flex items-center">
              <House color="#fff" />

              <span className="inline-block ml-2 text-base">Rent</span>
              <span className="text-base ml-auto text-red-600">-$500</span>
            </div>

            <div className="bg-neutral-950 rounded-md py-2 px-3 flex items-center">
              <TShirt color="#fff" />

              <span className="inline-block ml-2 text-base">Shirt</span>
              <span className="text-base ml-auto text-red-600">-$50</span>
            </div>

            <div className="bg-neutral-950 rounded-md py-2 px-3 flex items-center">
              <Bank color="#fff" />

              <span className="inline-block ml-2 text-base">
                Emergency HYSA
              </span>
              <span className="text-base ml-auto text-red-600">-$50</span>
            </div> */}
          </div>
        </section>
      </div>
    </>
  );
}

export default MobileOverview;
