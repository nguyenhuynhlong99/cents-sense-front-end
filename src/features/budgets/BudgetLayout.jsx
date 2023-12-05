import { useState } from 'react';
import { useExpectedIncomes } from './useExpectedIncome';
// import { useBudgets } from './useBudgets';

import { getMonth, getYear, parseISO } from 'date-fns';
import { currentMonth, currentYear } from '../../utils/helpers';

import Heading from '../../ui/Heading';
import Button from '../../ui/Button';
import ExpectedIncome from './ExpectedIncome';
import Loader from '../../ui/Loader';
import AddBudget from './AddBudget';
import Icon from '../../ui/Icon';

function BudgetLayout() {
  const userID = 1;
  const [openModal, setOpenModal] = useState(false);

  const { isLoading, expectedIncomes } = useExpectedIncomes();

  const monthlyExpectedIncome =
    getCurrentMonthExpectedIncome()?.at(0)?.expectedIncome;

  const expectedIncomeID = getCurrentMonthExpectedIncome()?.at(0)?.id;

  function getCurrentMonthExpectedIncome() {
    return expectedIncomes?.filter(
      (e) =>
        e.userID === userID &&
        getYear(parseISO(e.createdAt)) === currentYear &&
        getMonth(parseISO(e.createdAt)) === currentMonth
    );
  }

  if (isLoading) return <Loader />;

  // const { isLoading, budgets } = useBudgets();
  // const monthlyBudgets = getCurrentMonthBudgets();
  // function getCurrentMonthBudgets() {
  //   return budgets?.filter(
  //     (b) =>
  //       b.userID === userID &&
  //       getYear(parseISO(b.createdAt)) === currentYear &&
  //       getMonth(parseISO(b.createdAt)) === currentMonth
  //   );
  // }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading>Budget</Heading>
        {monthlyExpectedIncome && (
          <Button onClick={() => setOpenModal(true)}>Add a category</Button>
        )}
      </div>

      <ExpectedIncome expectedIncome={monthlyExpectedIncome} />
      <div>
        <Icon icon="basket" size={30} />
      </div>

      <AddBudget
        expectedIncomeID={expectedIncomeID}
        expectedIncomeAmount={monthlyExpectedIncome}
        isShown={openModal}
        setIsShown={setOpenModal}
      />
    </>
  );
}

export default BudgetLayout;
