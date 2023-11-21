import CircularProgressBar from '../../ui/CircularProgressBar';
import { formatCurrency } from '../../utils/helpers';

function BudgetCard({ icon, category, totalBudget, usedBudget }) {
  return (
    <div className="p-3 flex flex-col gap-2 bg-neutral-950 rounded-md">
      <span className="flex items-center gap-2 text-sm capitalize">
        {icon} {category}
      </span>
      <span className="text-xs">
        {formatCurrency(usedBudget)} / {formatCurrency(totalBudget)}
      </span>
      <div className="flex items-center gap-4">
        <span className="text-xs">
          {Math.round((usedBudget / totalBudget) * 100)}%
        </span>
        <CircularProgressBar
          size={20}
          percentage={Math.round((usedBudget / totalBudget) * 100)}
        />
      </div>
    </div>
  );
}

export default BudgetCard;
