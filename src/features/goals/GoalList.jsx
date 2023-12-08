import Icon from '../../ui/Icon';
import Loader from '../../ui/Loader';
import GoalCard from '../overview/GoalCard';
import { useGoals } from './useGoals';

function GoalList() {
  const userID = 1;
  const { isLoading, goals } = useGoals();

  const userGoals = getGoals();

  function getGoals() {
    return goals?.filter((g) => g.userID === userID);
  }

  if (isLoading) return <Loader />;

  if (userGoals?.length < 1) {
    return (
      <div className="max-w-[500px] m-auto lg:max-w-none lg:m-0 lg:flex lg:items-center lg:gap-3">
        <img
          className="max-w-[300px] m-auto lg:max-w-[400px] lg:m-0"
          src="personalgoalschecklist-cuate.svg"
          alt="manage accounts"
        />
        <div className="text-center">
          <h4 className="text-xl font-semibold text-green-500 sm:text-2xl lg:text-3xl">
            Ready to turn your dreams into realities?
          </h4>
          <p className="mt-3 text-base sm:text-lg lg:text-xl">
            Start by setting a savings goal today. Every step toward your goal
            brings you closer to making it a reality.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2">
        {userGoals?.map((g) => (
          <li key={g.id} className="bg-neutral-950 p-5 rounded-md">
            <GoalCard
              name={g.name}
              currentAmount={g.currentAmount}
              targetAmount={g.targetAmount}
              icon={<Icon name={g.icon} size={40} />}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GoalList;
