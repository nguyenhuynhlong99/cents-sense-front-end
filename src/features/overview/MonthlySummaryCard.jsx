import { TrendDown, TrendUp } from '@phosphor-icons/react';
import { formatCurrency } from '../../utils/helpers';

function MonthlySummaryCard({ label, amount, percent, type }) {
  let style;
  if (type === 'expense') {
    style =
      percent > 0 ? { color: 'rgb(239 68 68)' } : { color: 'rgb(34,197,94)' };
  } else {
    style =
      percent > 0 ? { color: 'rgb(34,197,94)' } : { color: 'rgb(239 68 68)' };
  }

  return (
    <div className="bg-neutral-950 rounded-md pl-4 pr-1 py-2">
      <div className="flex flex-col gap-2">
        <span className="capitalize">{label}</span>
        {type === 'total' ? (
          <span className="text-green-500 text-xl font-bold">
            {formatCurrency(amount)}
          </span>
        ) : (
          <span className="text-lg font-bold">{formatCurrency(amount)}</span>
        )}
        {percent && !isNaN(percent) && (
          <span className="text-xs flex items-center gap-1" style={style}>
            {percent > 0 ? <TrendUp size={20} /> : <TrendDown size={20} />}
            <span>
              {percent > 0
                ? `+${percent}% from last month`
                : `${percent}% from last month`}
            </span>
          </span>
        )}
      </div>
    </div>
  );
}

export default MonthlySummaryCard;
