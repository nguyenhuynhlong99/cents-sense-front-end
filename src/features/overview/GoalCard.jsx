import ProgressBar from '../../ui/ProgressBar';
import { formatCurrency } from '../../utils/helpers';

function GoalCard({ name, currentAmount, targetAmount, icon }) {
  if (icon) {
    return (
      <div className="flex items-center gap-3">
        {icon}
        <div className="flex-grow flex flex-col gap-2 py-2">
          <span className="text-lg sm:text-xl md:text-2xl">{name}</span>
          <ProgressBar
            height={5}
            percentage={Math.round((currentAmount / targetAmount) * 100)}
          />
          <div className="flex items-center justify-between text-xs md:text-base">
            <span>{formatCurrency(currentAmount)}</span>
            <span>{formatCurrency(targetAmount)}</span>
          </div>
        </div>
      </div>
    );
  }

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
