import { useBudgets } from './useBudgets';

import BudgetCard from '../overview/BudgetCard';
import Icon from '../../ui/Icon';
import { PencilSimple, TrashSimple } from '@phosphor-icons/react';

function BudgetList({
  expectedIncomeID,
  setOpenModal,
  setBudgetToEdit,
  setOpenDeleteModal,
}) {
  const { isLoading, budgets } = useBudgets();

  const monthlyBudgets = getCurrentMonthBudgets();

  function getCurrentMonthBudgets() {
    return budgets?.filter((b) => b.expectedIncomeID === expectedIncomeID);
  }

  function onOpenEditModal(budget) {
    setBudgetToEdit(budget);
    setOpenModal(true);
  }

  function onOpenDeleteModal(budget) {
    setBudgetToEdit(budget);
    setOpenDeleteModal(true);
  }

  return (
    <div className="mt-5 bg-neutral-950 p-5 rounded-md">
      <h3 className="text-lg mb-3 md:text-xl">Budget Categories</h3>

      <ul className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(200px,calc(100%/4-0.75em)))] justify-center sm:justify-normal">
        {monthlyBudgets?.map((b) => (
          <li key={b.id} className="relative">
            <BudgetCard
              icon={<Icon name={b.icon} />}
              category={b.category}
              totalBudget={b.amount}
              usedBudget={0}
            />
            <div className="absolute right-1 bottom-0">
              <button
                onClick={() => onOpenEditModal(b)}
                className="text-green-500 mr-2"
              >
                <PencilSimple size={20} />
              </button>
              <button
                onClick={() => onOpenDeleteModal(b)}
                className="text-red-500"
              >
                <TrashSimple size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BudgetList;
