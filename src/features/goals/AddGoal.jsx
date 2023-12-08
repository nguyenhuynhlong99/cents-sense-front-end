import Modal from '../../ui/Modal';
import AddGoalForm from './AddGoalForm';

function AddGoal({ openAddModal, setOpenAddModal }) {
  return (
    <Modal isShown={openAddModal} setIsShown={setOpenAddModal}>
      <Modal.Body>
        <AddGoalForm setIsShown={setOpenAddModal} />
      </Modal.Body>
    </Modal>
  );
}

export default AddGoal;
