import Modal from '../../ui/Modal';
import AddBudgetForm from './AddBudgetForm';

function AddBudget({
  isShown,
  setIsShown,
  expectedIncomeID,
  expectedIncomeAmount,
  budgetToEdit,
}) {
  return (
    <Modal isShown={isShown} setIsShown={setIsShown}>
      <Modal.Body>
        <AddBudgetForm
          expectedIncomeAmount={expectedIncomeAmount}
          expectedIncomeID={expectedIncomeID}
          setIsShown={setIsShown}
          budgetToEdit={budgetToEdit}
        />
      </Modal.Body>
    </Modal>
  );
}

export default AddBudget;
