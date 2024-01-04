import { useDeleteGoal } from './useDeleteGoal';
import { Warning } from '@phosphor-icons/react';
import Modal from '../../ui/Modal';

function DeleteGoal({ goalToDelete, openDeleteModal, setOpenDeleteModal }) {
  const { isDeleting, deleteGoal } = useDeleteGoal();
  const goalID = goalToDelete?.id;
  const goalName = goalToDelete?.name;

  function onDeleteGoal() {
    deleteGoal(goalID, {
      onSuccess: () => {
        setOpenDeleteModal(false);
      },
    });
  }

  return (
    <Modal isShown={openDeleteModal} setIsShown={setOpenDeleteModal}>
      <Modal.Header>Delete Goal</Modal.Header>
      <Modal.Body>
        <div className="mt-5 flex items-center justify-center gap-5">
          <Warning color="red" size={40} />
          <span className="font-semibold text-xl">
            Are you sure you want to delete {goalName}?
          </span>
        </div>

        <div className="flex items-center justify-end gap-3 ml-auto mt-7">
          <button
            disabled={isDeleting}
            onClick={() => setOpenDeleteModal(false)}
            className="p-2 border text-gray-400 border-neutral-500 rounded-md hover:text-inherit hover:border-white focus:text-inherit focus:border-white"
          >
            Cancel
          </button>
          <button
            onClick={onDeleteGoal}
            disabled={isDeleting}
            className="py-2 px-4 bg-red-500 border border-transparent rounded-md hover:text-red-500 hover:bg-transparent hover:border-red-500 focus:text-red-500 focus:bg-transparent focus:border-red-500"
          >
            Delete
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteGoal;
