import { formatCurrency } from '../../utils/helpers';

function MobileSummaryCard({ name, icon, amount }) {
  return (
    <div className="p-3 rounded-2xl bg-neutral-950 flex items-center justify-center gap-1">
      {icon}
      <div className="flex flex-col">
        <span className="text-xs capitalize">{name}</span>
        <span className="text-sm font-bold">{formatCurrency(amount)}</span>
      </div>
    </div>
  );
}

export default MobileSummaryCard;
