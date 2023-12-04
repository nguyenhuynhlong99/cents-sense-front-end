import Modal from '../../ui/Modal';

function AddBudget({ isShown, setIsShown }) {
  return (
    <Modal isShown={isShown} setIsShown={setIsShown}>
      <Modal.Body>Hello</Modal.Body>
    </Modal>
  );
}

export default AddBudget;
