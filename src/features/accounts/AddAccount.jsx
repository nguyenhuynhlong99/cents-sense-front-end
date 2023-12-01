import Modal from '../../ui/Modal';
import AddAccountForm from './AddAccountForm';

function AddAccount({
  accountToEdit = {},
  isShown,
  setIsShown,
  allTypesOfAccount,
}) {
  return (
    <Modal isShown={isShown} setIsShown={setIsShown}>
      <Modal.Body>
        <AddAccountForm
          accountToEdit={accountToEdit}
          setIsShown={setIsShown}
          allTypesOfAccount={allTypesOfAccount}
        />
      </Modal.Body>
    </Modal>
  );
}

export default AddAccount;
