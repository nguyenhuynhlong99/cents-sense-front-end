import Modal from '../../ui/Modal';
import AddBudgetForm from './AddBudgetForm';

function AddBudget({ isShown, setIsShown, budgetToEdit }) {
  return (
    <Modal isShown={isShown} setIsShown={setIsShown}>
      <Modal.Body>
        <AddBudgetForm setIsShown={setIsShown} budgetToEdit={budgetToEdit} />
      </Modal.Body>
    </Modal>
  );
}

export default AddBudget;
