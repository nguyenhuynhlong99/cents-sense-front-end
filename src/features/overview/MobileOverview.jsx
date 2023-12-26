import AccountCard from '../../ui/AccountCard';
import {
  ArrowCircleDown,
  ArrowCircleUp,
  Money,
  PiggyBank,
} from '@phosphor-icons/react';
import MobileSummaryCard from './MobileSummaryCard';
import { currentYear, formatCurrency, currentMonth } from '../../utils/helpers';
import { getMonth, getYear, parseISO } from 'date-fns';
import MobileTransactionCard from './MobileTransactionCard';
import { useUser } from '../auth/useUser';
import Icon from '../../ui/Icon';

function MobileOverview({ data }) {
  const { user, isLoading } = useUser();
  const totalBalance = getTotalBalance();
  const monthlyIncome = getMonthlyIncome();
  const monthlyExpense = getMonthlyExpense();
  const monthlyBudgetUsedAmount = getMonthlyBudgetUsed();
  const monthlySaving = monthlyIncome - monthlyExpense;
  const recentTransactions = user?.transactions?.sort(
    (a, b) => new Date(parseISO(b.date)) - new Date(parseISO(a.date))
  );
  console.log(user);

  function getTotalBalance() {
    return user?.accounts
      ?.filter((acc) => acc.type !== 'credit')
      .reduce((acc, curr) => acc + curr.balance, 0);
  }

  function getMonthlyIncome() {
    return user?.transactions
      ?.filter(
        (t) =>
          t.type === 'income' &&
          getYear(parseISO(t.date)) === currentYear &&
          getMonth(parseISO(t.date)) === currentMonth
      )
      .reduce((acc, curr) => acc + curr.amount, 0);
  }

  function getMonthlyExpense() {
    return user?.transactions
      ?.filter(
        (t) =>
          t.type === 'expense' &&
          getYear(parseISO(t.date)) === currentYear &&
          getMonth(parseISO(t.date)) === currentMonth
      )
      .reduce((acc, curr) => acc + curr.amount, 0);
  }

  function getMonthlyBudgetUsed() {
    const expectedIncomeId = user?.expectedIncomes?.find(
      (inc) =>
        getYear(parseISO(inc.createdAt)) === currentYear &&
        getMonth(parseISO(inc.createdAt)) === currentMonth
    ).id;

    return user?.budgets
      ?.filter((b) => b.expectedIncomeId === expectedIncomeId)
      .reduce((acc, curr) => acc + curr.amount, 0);
  }

  function getIconWithBudgetId(budgetId) {
    const icon = user?.budgets?.find((b) => b.id === budgetId)?.icon;

    return <Icon name={icon} />;
  }

  return (
    <>
      <div className="max-w-[300px] m-auto pt-2">
        <section className="mb-4">
          <span className="block text-sm font-medium text-neutral-400">
            Total Balance
          </span>
          <span className="block text-2xl font-bold text-green-500 font-space mb-2">
            {formatCurrency(totalBalance)}
          </span>

          <ul className="flex overflow-x-auto snap-x snap-mandatory gap-3 py-2">
            {user?.accounts?.map((acc) => (
              <li
                key={acc.id}
                className="h-[100px] w-[180px] flex-shrink-0 snap-center snap-always"
              >
                <AccountCard
                  type="small"
                  name={acc.name}
                  balance={acc.balance}
                  color={acc.color}
                />
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-4">
          <h3 className="text-base font-medium mb-2">Monthly Summary</h3>

          <div className="grid grid-cols-2 gap-2">
            <MobileSummaryCard
              name="income"
              amount={monthlyIncome}
              icon={<ArrowCircleUp color="#1E51D9" size={35} />}
            />

            <MobileSummaryCard
              name="Expense"
              amount={monthlyExpense}
              icon={<ArrowCircleDown color="#eb001b" size={35} />}
            />

            <MobileSummaryCard
              name="Budget"
              amount={monthlyBudgetUsedAmount}
              icon={<Money color="#21c55d" size={35} />}
            />

            <MobileSummaryCard
              name="Saving"
              amount={monthlySaving}
              icon={<PiggyBank color="#F9DF4A" size={40} />}
            />
          </div>
        </section>

        <section>
          <h3 className="text-base font-medium mb-2">Recent Transactions</h3>

          <div className="flex flex-col gap-2">
            {recentTransactions.map((t) => (
              <MobileTransactionCard
                type={t.type}
                description={t.description}
                icon={getIconWithBudgetId(t.budgetId)}
                amount={t.amount}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default MobileOverview;
