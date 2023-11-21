import ProgressBar from '../../ui/ProgressBar';
import { formatCurrency } from '../../utils/helpers';

function GoalCard({ name, currentAmount, targetAmount }) {
  return (
    <div className="flex flex-col gap-2 py-2">
      <span>{name}</span>
      <ProgressBar
        height={5}
        percentage={Math.round((currentAmount / targetAmount) * 100)}
      />
      <div className="flex items-center justify-between text-xs">
        <span>{formatCurrency(currentAmount)}</span>
        <span>{formatCurrency(targetAmount)}</span>
      </div>
    </div>
  );
}

export default GoalCard;
