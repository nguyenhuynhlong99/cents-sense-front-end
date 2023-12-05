import Modal from '../../ui/Modal';
import AddBudgetForm from './AddBudgetForm';

function AddBudget({
  isShown,
  setIsShown,
  expectedIncomeID,
  expectedIncomeAmount,
}) {
  return (
    <Modal isShown={isShown} setIsShown={setIsShown}>
      <Modal.Body>
        <AddBudgetForm
          expectedIncomeAmount={expectedIncomeAmount}
          expectedIncomeID={expectedIncomeID}
          setIsShown={setIsShown}
        />
      </Modal.Body>
    </Modal>
  );
}

export default AddBudget;
