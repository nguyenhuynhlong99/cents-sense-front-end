import Modal from '../../ui/Modal';
import AddTransactionForm from './AddTransactionForm';

function AddTransaction({ openAddModal, setOpenAddModal }) {
  return (
    <Modal isShown={openAddModal} setIsShown={setOpenAddModal}>
      <Modal.Body>
        <AddTransactionForm setIsShown={setOpenAddModal} />
      </Modal.Body>
    </Modal>
  );
}

export default AddTransaction;
