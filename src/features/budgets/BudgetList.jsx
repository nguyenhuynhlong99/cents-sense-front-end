import BudgetCard from '../overview/BudgetCard';
import Icon from '../../ui/Icon';
import { PencilSimple, TrashSimple } from '@phosphor-icons/react';
import { formatCurrency } from '../../utils/helpers';
import { useUser } from '../auth/useUser';

function BudgetList({
  monthlyExpectedIncome,
  expectedIncomeID,
  setOpenModal,
  setBudgetToEdit,
  setOpenDeleteModal,
}) {
  const { isLoading, user } = useUser();
  const budgets = user?.budgets;

  const monthlyBudgets = getCurrentMonthBudgets();
  const totalAmountBudgetUsed = getTotalBudgetUsed();
  const leftToBudget = monthlyExpectedIncome - totalAmountBudgetUsed;

  function getCurrentMonthBudgets() {
    return budgets?.filter((b) => b.expectedIncomeId === expectedIncomeID);
  }

  function getTotalBudgetUsed() {
    return monthlyBudgets?.reduce((acc, curr) => acc + curr.amount, 0);
  }

  function getTotalUsedBudget(budgetId) {
    return user?.transactions
      ?.filter((t) => t.budgetId === budgetId)
      .reduce((acc, curr) => acc + curr.amount, 0);
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
      <h3 className="text-lg mb-1 md:text-xl">Budget Categories</h3>
      <span className="block mb-3 text-sm font-semibold">
        Left to budget:
        <span className="text-green-500"> {formatCurrency(leftToBudget)}</span>
      </span>

      <ul className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(200px,calc(100%/4-0.75em)))] justify-center sm:justify-normal">
        {monthlyBudgets?.map((b) => (
          <li key={b.id} className="relative">
            <BudgetCard
              icon={<Icon name={b.icon} />}
              category={b.category}
              totalBudget={b.amount}
              usedBudget={getTotalUsedBudget(b.id)}
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
