import { parseISO } from 'date-fns';
import { formatCurrency } from '../../utils/helpers';
import Icon from '../../ui/Icon';
import { useAccount } from '../accounts/useAccount';
import Loader from '../../ui/Loader';

function TransactionItem({ transaction }) {
  let name;
  const { account: toAccount, isLoading } = useAccount(
    transaction?.toAccountId ? transaction?.toAccountId : null
  );

  name = transaction?.goals?.name ? transaction.goals?.name : toAccount?.name;

  if (isLoading) return <Loader />;

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
