import { parseISO } from 'date-fns';
import { formatCurrency } from '../../utils/helpers';
import Icon from '../../ui/Icon';
import { useAccount } from '../accounts/useAccount';

function TransactionItem({ transaction }) {
  let name;
  const { account: toAccount } = useAccount(
    transaction?.toAccountId ? transaction?.toAccountId : null
  );

  // const { goal } = useGoal(
  //   transaction?.goalId !== 0 ? transaction?.goalId : null
  // );
  name = transaction?.goals?.name ? transaction.goals?.name : toAccount?.name;

  return (
    <li className="bg-neutral-950 rounded-lg py-4 px-5 shadow-md flex flex-col gap-2 min-h-[160px]">
      <h4 className="font-bold capitalize text-lg max-w-[250px] truncate sm:text-xl">
        {transaction.description}
      </h4>
      {transaction?.budgets?.category && (
        <div className="flex items-center gap-1 text-xs sm:text-sm">
          <Icon name={transaction?.budgets?.icon} color="white" />
          <span className="capitalize">{transaction?.budgets?.category}</span>
        </div>
      )}
      {transaction?.type !== 'transfer' ? (
        <span className="font-bold capitalize text-sm sm:text-base">
          {transaction?.accounts?.name}
        </span>
      ) : (
        <div>
          <span className="font-bold capitalize text-xs sm:text-sm">
            {transaction?.accounts?.name}
          </span>

          <span className="block font-bold capitalize text-green-500 text-sm sm:text-base">
            &rarr; {name}
          </span>
        </div>
      )}
      <div className="mt-auto">
        <span className="text-xs block">
          {parseISO(transaction.created_at).toDateString()}
        </span>
        <span
          className="font-semibold font-space text-lg sm:text-xl"
          style={
            transaction?.type === 'expense'
              ? { color: 'rgb(220 38 38)' }
              : transaction?.type === 'income'
              ? { color: 'rgb(34,197,94)' }
              : null
          }
        >
          {transaction.type === 'expense'
            ? formatCurrency(-transaction.amount)
            : transaction.type === 'transfer'
            ? formatCurrency(transaction.amount)
            : '+' + formatCurrency(transaction.amount)}
        </span>
      </div>
    </li>
  );
}

export default TransactionItem;

/* <div className="mt-5 rounded-lg overflow-auto shadow-md border border-neutral-600"> */
//   <div role="table" className="text-sm min-w-[700px]">
//     {/* thead */}
//     <div role="rowgroup" className="border-b border-neutral-600">
//       <div
//         role="row"
//         className="grid grid-cols-[_1.5fr,_2fr,_1fr,_2fr,_1fr] py-4 px-6 uppercase font-semibold"
//       >
//         <div role="columnheader">Date</div>
//         <div role="columnheader">Account</div>
//         <div role="columnheader">Category</div>
//         <div role="columnheader">Description</div>
//         <div role="columnheader">Amount</div>
//       </div>
//     </div>

//     {/* tbody */}
//     <div role="rowgroup">
//       {recentTransactions?.map((t) => (
//         <div
//           role="row"
//           className="bg-neutral-950 border-b border-b-neutral-600 grid grid-cols-[_1.5fr,_2fr,_1fr,_2fr,_1fr] py-4 px-6"
//         >
//           <div role="cell">{parseISO(t.date).toDateString()}</div>
//           <div role="cell" className="font-semibold">
//             {t.account.name}
//           </div>
//           <div role="cell" className="font-semibold capitalize">
//             {t?.budget ? t.budget.category : t.type}
//           </div>
//           <div role="cell">{t.description}</div>
//           <div
//             role="cell"
//             className={`${
//               t.type === 'expense' ? 'text-red-600' : 'text-green-500'
//             } font-bold font-space text-base`}
//           >
//             {t.type === 'expense'
//               ? formatCurrency(-t.amount)
//               : formatCurrency(t.amount)}
//           </div>
//         </div>
//       ))}
//     </div>
//     <div role="rowgroup" className="border-neutral-600">
//       <div
//         role="row"
//         className="flex items-center justify-between py-4 px-6"
//       >
//         <p>
//           Showing {recentTransactions?.length} of{' '}
//           {recentTransactions?.length}
//         </p>
//         <div className="flex items-center gap-10">
//           <button>&lt; Previous</button>
//           <button>Next &gt;</button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
