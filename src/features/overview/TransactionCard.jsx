import { formatCurrency } from '../../utils/helpers';

function TransactionCard({ icon, date, amountMoney, detail, type }) {
  const isIncome = type === 'income';
  const isExpense = type === 'expense';

  return (
    <div className="grid grid-cols-[40%,20%,40%] py-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className="truncate">{detail}</span>
      </div>
      {isIncome ? (
        <span className="font-bold font-space text-green-400">
          {'+' + formatCurrency(amountMoney)}
        </span>
      ) : isExpense ? (
        <span className="font-bold font-space text-red-500">
          {formatCurrency(-amountMoney)}
        </span>
      ) : (
        <span className="font-bold font-space">
          {formatCurrency(amountMoney)}
        </span>
      )}
      <span className="text-right">{date}</span>
    </div>
  );
}

export default TransactionCard;
