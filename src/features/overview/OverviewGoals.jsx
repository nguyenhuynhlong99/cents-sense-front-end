import { useUser } from '../auth/useUser';
import GoalCard from './GoalCard';

function OverviewGoals() {
  const userId = 1;
  const { user } = useUser();

  return (
    <section className="bg-neutral-950 p-3 rounded-md text-sm">
      <h3 className="text-lg mb-3">Saving Goals</h3>

      <div className="flex flex-col divide-y divide-slate-700">
        {user?.goals?.map((goal) => (
          <GoalCard
            key={goal.id}
            name={goal.name}
            currentAmount={goal.currentAmount}
            targetAmount={goal.targetAmount}
          />
        ))}
      </div>
    </section>
  );
}

export default OverviewGoals;
