import Modal from '../../ui/Modal';
import AddGoalForm from './AddGoalForm';

function AddGoal({ goalToEdit, openAddModal, setOpenAddModal }) {
  return (
    <Modal isShown={openAddModal} setIsShown={setOpenAddModal}>
      <Modal.Body>
        <AddGoalForm goalToEdit={goalToEdit} setIsShown={setOpenAddModal} />
      </Modal.Body>
    </Modal>
  );
}

export default AddGoal;
