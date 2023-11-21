import { formatCurrency } from '../../utils/helpers';

function MobileTransactionCard({ icon, description, type, amount }) {
  const isIncome = type === 'income';

  return (
    <div className="bg-neutral-950 rounded-md py-2 px-3 flex items-center">
      {icon}
      <span className="inline-block ml-2 text-sm">{description}</span>
      {isIncome ? (
        <span className="text-sm ml-auto text-green-400">
          {formatCurrency(amount)}
        </span>
      ) : (
        <span className="text-sm ml-auto text-red-500">
          {formatCurrency(-amount)}
        </span>
      )}
    </div>
  );
}

export default MobileTransactionCard;
