import { useState } from 'react';
import { useExpectedIncomes } from './useExpectedIncome';

import { getMonth, getYear, parseISO } from 'date-fns';
import { currentMonth, currentYear } from '../../utils/helpers';

import Heading from '../../ui/Heading';
import Button from '../../ui/Button';
import ExpectedIncome from './ExpectedIncome';
import Loader from '../../ui/Loader';
import AddBudget from './AddBudget';

import BudgetList from './BudgetList';
import DeleteBudget from './DeleteBudget';
import BudgetBreakdown from './BudgetBreakdown';
import { useUser } from '../auth/useUser';

function BudgetLayout() {
  const { user } = useUser();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [budgetToEdit, setBudgetToEdit] = useState({});

  const { isLoading, expectedIncomes } = useExpectedIncomes();

  const monthlyExpectedIncome =
    getCurrentMonthExpectedIncome()?.at(0)?.expectedIncome;

  const expectedIncomeId = getCurrentMonthExpectedIncome()?.at(0)?.id;

  function getCurrentMonthExpectedIncome() {
    return user?.expectedIncomes?.filter(
      (e) =>
        getYear(parseISO(e.createdAt)) === currentYear &&
        getMonth(parseISO(e.createdAt)) === currentMonth
    );
  }

  function onOpenAddModal() {
    setBudgetToEdit({});
    setOpenAddModal(true);
  }

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading>Budget</Heading>
        {monthlyExpectedIncome && (
          <Button onClick={onOpenAddModal}>
            <span className="hidden sm:block">Add a category</span>
            <span className="sm:hidden">Add &#x2B;</span>
          </Button>
        )}
      </div>

      {monthlyExpectedIncome ? (
        <>
          <ExpectedIncome expectedIncome={monthlyExpectedIncome} />

          <BudgetList
            monthlyExpectedIncome={monthlyExpectedIncome}
            setOpenModal={setOpenAddModal}
            setBudgetToEdit={setBudgetToEdit}
            expectedIncomeID={expectedIncomeId}
            setOpenDeleteModal={setOpenDeleteModal}
          />

          <BudgetBreakdown expectedIncomeId={expectedIncomeId} />
        </>
      ) : (
        <ExpectedIncome expectedIncome={monthlyExpectedIncome} />
      )}

      <AddBudget
        budgetToEdit={budgetToEdit}
        expectedIncomeId={expectedIncomeId}
        expectedIncomeAmount={monthlyExpectedIncome}
        isShown={openAddModal}
        setIsShown={setOpenAddModal}
      />

      <DeleteBudget
        budgetToDelete={budgetToEdit}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
    </>
  );
}

export default BudgetLayout;
