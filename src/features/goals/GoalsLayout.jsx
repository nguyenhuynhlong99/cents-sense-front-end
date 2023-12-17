import { useState } from 'react';
import Button from '../../ui/Button';
import Heading from '../../ui/Heading';
import AddGoal from './AddGoal';
import GoalList from './GoalList';
import DeleteGoal from './DeleteGoal';

function GoalsLayout() {
  // const userID = 2;
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState({});

  function onOpenAddModal() {
    setGoalToEdit({});
    setOpenAddModal(true);
  }

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <Heading>Goals</Heading>
        <Button onClick={onOpenAddModal}>
          <span className="hidden sm:block">Add a goal</span>
          <span className="sm:hidden">Add &#x2B;</span>
        </Button>
      </div>

      <GoalList
        setOpenAddModal={setOpenAddModal}
        setGoalToEdit={setGoalToEdit}
        setOpenDeleteModal={setOpenDeleteModal}
      />

      <AddGoal
        goalToEdit={goalToEdit}
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      />

      <DeleteGoal
        goalToDelete={goalToEdit}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
    </>
  );
}

export default GoalsLayout;
