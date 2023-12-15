import Modal from '../../ui/Modal';
import AddBudgetForm from './AddBudgetForm';

function AddBudget({
  isShown,
  setIsShown,
  expectedIncomeId,
  expectedIncomeAmount,
  budgetToEdit,
}) {
  return (
    <Modal isShown={isShown} setIsShown={setIsShown}>
      <Modal.Body>
        <AddBudgetForm
          expectedIncomeAmount={expectedIncomeAmount}
          expectedIncomeId={expectedIncomeId}
          setIsShown={setIsShown}
          budgetToEdit={budgetToEdit}
        />
      </Modal.Body>
    </Modal>
  );
}

export default AddBudget;
