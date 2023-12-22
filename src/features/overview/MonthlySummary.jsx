import { LoaderIcon } from 'react-hot-toast';
import { useUser } from '../auth/useUser';
import { getMonth, getYear, parse, parseISO } from 'date-fns';
import { currentMonth, currentYear } from '../../utils/helpers';
import MonthlySummaryCard from './MonthlySummaryCard';

function MonthlySummary() {
  const userId = 1;
  const { user, isLoading } = useUser();

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
    return user?.accounts
      ?.filter((acc) => acc.type !== 'credit')
      .reduce((acc, curr) => acc + curr.balance, 0);
  }

  function getPreviousMonthlyIncome() {
    return user?.transactions
      ?.filter((t) => {
        if (getMonth(parseISO(t.date)) !== 0) {
          return (
            t.type === 'income' &&
            getYear(parseISO(t.date)) === currentYear &&
            getMonth(parseISO(t.date)) === currentMonth - 1
          );
        }

        return (
          t.type === 'income' &&
          getYear(parseISO(t.date)) === currentYear - 1 &&
          getMonth(parseISO(t.date)) === 11
        );
      })
      .reduce((acc, curr) => acc + curr.amount, 0);
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

  function getPreviousMonthlyExpense() {
    return user?.transactions
      ?.filter((t) => {
        if (getMonth(parseISO(t.date)) !== 0) {
          return (
            t.type === 'expense' &&
            getYear(parseISO(t.date)) === currentYear &&
            getMonth(parseISO(t.date)) === currentMonth - 1
          );
        }

        return (
          t.type === 'income' &&
          getYear(parseISO(t.date)) === currentYear - 1 &&
          getMonth(parseISO(t.date)) === 11
        );
      })
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

  if (isLoading) return <LoaderIcon />;

  return (
    <div className="grid grid-cols-4 gap-5">
      <MonthlySummaryCard
        label="total balance"
        amount={totalBalance}
        type="total"
      />
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
