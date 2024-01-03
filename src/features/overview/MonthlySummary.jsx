import { LoaderIcon } from 'react-hot-toast';
// import { useUser } from '../auth/useUser';
import { useAccounts } from '../../features/accounts/useAccounts';
import { useTransactions } from '../../features/transactions/useTransactions';

import { getMonth, getYear, parseISO } from 'date-fns';
import { currentMonth, currentYear } from '../../utils/helpers';
import MonthlySummaryCard from './MonthlySummaryCard';

function MonthlySummary() {
  // const { user, isLoading } = useUser();
  const { accounts } = useAccounts();
  const { transactions, isLoading } = useTransactions();

  const totalBalance = getTotalBalance();
  const monthlyIncome = getMonthlyIncome();
  const monthlyExpense = getMonthlyExpense();
  const monthlySaving = monthlyIncome - monthlyExpense;

  const previousMonthlyIncome = getPreviousMonthlyIncome();
  const previousMonthlyExpense = getPreviousMonthlyExpense();
  const previousMonthlySaving = previousMonthlyIncome - previousMonthlyExpense;

  const monthlyIncomePercent =
    ((monthlyIncome - previousMonthlyIncome) / previousMonthlyIncome) * 100;
  const monthlyExpensePercent =
    ((monthlyExpense - previousMonthlyExpense) / previousMonthlyExpense) * 100;
  const monthlySavingPercent =
    ((monthlySaving - previousMonthlySaving) / previousMonthlySaving) * 100;

  function getTotalBalance() {
    return accounts
      ?.filter((acc) => acc.type !== 'credit')
      .reduce((acc, curr) => acc + curr.balance, 0);
  }

  function getPreviousMonthlyIncome() {
    return transactions
      ?.filter((t) => {
        if (getMonth(parseISO(t.created_at)) !== 0) {
          return (
            t.type === 'income' &&
            getYear(parseISO(t.created_at)) === currentYear &&
            getMonth(parseISO(t.created_at)) === currentMonth - 1
          );
        }

        return (
          t.type === 'income' &&
          getYear(parseISO(t.created_at)) === currentYear - 1 &&
          getMonth(parseISO(t.created_at)) === 11
        );
      })
      .reduce((acc, curr) => acc + curr.amount, 0);
  }

  function getMonthlyIncome() {
    return transactions
      ?.filter(
        (t) =>
          t.type === 'income' &&
          getYear(parseISO(t.created_at)) === currentYear &&
          getMonth(parseISO(t.created_at)) === currentMonth
      )
      .reduce((acc, curr) => acc + curr.amount, 0);
  }

  function getPreviousMonthlyExpense() {
    return transactions
      ?.filter((t) => {
        if (getMonth(parseISO(t.created_at)) !== 0) {
          return (
            t.type === 'expense' &&
            getYear(parseISO(t.created_at)) === currentYear &&
            getMonth(parseISO(t.created_at)) === currentMonth - 1
          );
        }

        return (
          t.type === 'income' &&
          getYear(parseISO(t.created_at)) === currentYear - 1 &&
          getMonth(parseISO(t.created_at)) === 11
        );
      })
      .reduce((acc, curr) => acc + curr.amount, 0);
  }

  function getMonthlyExpense() {
    return transactions
      ?.filter(
        (t) =>
          t.type === 'expense' &&
          getYear(parseISO(t.created_at)) === currentYear &&
          getMonth(parseISO(t.created_at)) === currentMonth
      )
      .reduce((acc, curr) => acc + curr.amount, 0);
  }

  if (isLoading) return <LoaderIcon />;

  if (accounts?.length < 1 && transactions?.length < 1) return null;

  return (
    <div className="grid grid-cols-4 gap-5">
      {totalBalance !== 0 && (
        <MonthlySummaryCard
          label="total balance"
          amount={totalBalance}
          type="total"
        />
      )}
      <MonthlySummaryCard
        label="monthly income"
        amount={monthlyIncome}
        percent={monthlyIncomePercent.toFixed()}
      />
      <MonthlySummaryCard
        label="monthly expense"
        amount={monthlyExpense}
        percent={monthlyExpensePercent.toFixed()}
        type="expense"
      />
      <MonthlySummaryCard
        label="monthly saving"
        amount={monthlySaving}
        percent={monthlySavingPercent.toFixed()}
      />
    </div>
  );
}

export default MonthlySummary;
