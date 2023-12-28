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
  const { user, isLoading } = useUser();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [budgetToEdit, setBudgetToEdit] = useState({});

  const monthlyExpectedIncome = getCurrentMonthExpectedIncome()?.expectedIncome;

  const expectedIncomeId = getCurrentMonthExpectedIncome()?.id;

  function getCurrentMonthExpectedIncome() {
    return user?.expectedIncomes?.find(
      (e) =>
        getYear(parseISO(e.createdAt)) === currentYear &&
        getMonth(parseISO(e.createdAt)) === currentMonth
    );
  }

  function onOpenAddModal() {
    setBudgetToEdit({});
    setOpenAddModal(true);
  }

  console.log(user);

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

          {user?.budgets.length > 0 ? (
            <>
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
            <div className="mt-3 md:flex md:items-center md:justify-between md:gap-2">
              <img
                className="max-w-[280px] m-auto sm:max-w-[340px] md:max-w-[380px]"
                src="Personal finance-amico.svg"
                alt="personalized budget"
              />

              <div className="text-center md:text-left">
                <h3 className="text-base text-green-500 font-semibold mb-1 sm:text-lg md:text-2xl">
                  Tailor your finances to fit your life!
                </h3>
                <p className="text-xs sm:text-sm md:text-base">
                  Let's create your personalized budget categories that align
                  with your goals and aspirations. Your financial success begins
                  with purposeful planning.
                </p>
              </div>
            </div>
          )}
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
