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

function BudgetLayout() {
  const userID = 1;
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [budgetToEdit, setBudgetToEdit] = useState({});

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
          <Button onClick={onOpenAddModal}>Add a category</Button>
        )}
      </div>

      <ExpectedIncome expectedIncome={monthlyExpectedIncome} />

      <BudgetList
        setOpenModal={setOpenAddModal}
        setBudgetToEdit={setBudgetToEdit}
        expectedIncomeID={expectedIncomeID}
        setOpenDeleteModal={setOpenDeleteModal}
      />

      <AddBudget
        budgetToEdit={budgetToEdit}
        expectedIncomeID={expectedIncomeID}
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
