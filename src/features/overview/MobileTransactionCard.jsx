import { formatCurrency } from '../../utils/helpers';

function MobileTransactionCard({ icon, description, type, amount }) {
  const isIncome = type === 'income';
  const isExpense = type === 'expense';

  return (
    <div className="bg-neutral-950 rounded-md py-2 px-3 flex items-center">
      {icon}

      <span className="inline-block ml-2 text-sm capitalize max-w-[130px] truncate">
        {description}
      </span>

      {isIncome ? (
        <span className="text-sm ml-auto text-green-400 font-space font-semibold">
          {'+' + formatCurrency(amount)}
        </span>
      ) : isExpense ? (
        <span className="text-sm ml-auto text-red-500 font-space font-semibold">
          {formatCurrency(-amount)}
        </span>
      ) : (
        <span className="text-sm ml-auto font-space font-semibold">
          {formatCurrency(amount)}
        </span>
      )}
    </div>
  );
}

export default MobileTransactionCard;
