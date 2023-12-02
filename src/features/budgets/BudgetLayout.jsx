import { getMonth, parseISO } from 'date-fns';
import { useBudgets } from './useBudgets';
import { currentMonth } from '../../utils/helpers';
import Heading from '../../ui/Heading';
import Button from '../../ui/Button';

function BudgetLayout() {
  const { isLoading, budgets } = useBudgets();
  const monthlyBudgets = getCurrentMonthBudgets();

  function getCurrentMonthBudgets() {
    return budgets?.filter(
      (b) => getMonth(parseISO(b.createdAt)) === currentMonth
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading>Budget</Heading>
        {monthlyBudgets?.length ? <Button>Add a budget</Button> : null}
      </div>

      {!monthlyBudgets?.length && (
        // <div className="mt-5">
        //   <div className="flex flex-col items-center">
        //     <img
        //       className="w-[50%]"
        //       src="managemoney-bro.svg"
        //       alt="managing money"
        //     />

        //     <div className="text-base font-semibold text-center">
        //       <p>You haven't create your budget plan for the current month!</p>
        //       <p>
        //         Let's start taking control of your financial journey by defining
        //         budget limits and creating personalized categories
        //       </p>
        //     </div>
        //   </div>
        //   <div className="mt-4 flex items-center justify-center gap-2">
        //     <span>$</span>
        //     <input
        //       className="p-2 max-w-[250px] w-full m-auto bg-neutral-950 rounded-md outline-none placeholder:text-lg"
        //       type="number"
        //       placeholder="Enter your expected income"
        //     />
        //   </div>
        // </div>
        <div className="max-w-[500px] m-auto lg:max-w-none lg:m-0 lg:flex lg:items-center lg:gap-3">
          <img
            className="max-w-[300px] m-auto lg:max-w-[400px] lg:m-0"
            src="managemoney-bro.svg"
            alt="managing money"
          />
          <div className="text-center">
            <h4 className="text-xl font-semibold text-green-500 sm:text-2xl lg:text-3xl">
              Launch your financial journey
            </h4>
            <p className="mt-3 text-base sm:text-lg lg:text-xl">
              Add your first account and kickstart smarter money management,
              effortlessly.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default BudgetLayout;
