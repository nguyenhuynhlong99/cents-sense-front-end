import { useState } from 'react';
import Button from '../../ui/Button';
import Heading from '../../ui/Heading';
import Icon from '../../ui/Icon';
import GoalCard from '../overview/GoalCard';
import AddGoal from './AddGoal';
import GoalList from './GoalList';

function GoalsLayout() {
  const userID = 2;
  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <Heading>Goals</Heading>
        <Button onClick={() => setOpenAddModal(true)}>Add a goal</Button>
      </div>

      <GoalList />

      <AddGoal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} />
    </>
  );
}

export default GoalsLayout;
