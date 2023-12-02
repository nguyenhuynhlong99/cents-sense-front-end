import Heading from '../../ui/Heading';

import AddAccount from './AddAccount';
import AccountsList from './AccountsList';

import { useState } from 'react';
import DeleteAccount from './DeleteAccount';
import Button from '../../ui/Button';

function AccountsLayout() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState({});

  const allTypesOfAccount = [
    { type: 'debit', name: 'Debit Card' },
    { type: 'credit', name: 'Credit Card' },
    { type: 'saving', name: 'Saving Account' },
  ];

  function onOpenAddAccountModal() {
    setOpenAddModal(true);
    setAccountToEdit({});
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <Heading>Accounts</Heading>
        <Button onClick={onOpenAddAccountModal}>
          <span className="hidden sm:block">Add your account</span>
          <span className="sm:hidden">Add &#x2B;</span>
        </Button>
      </div>

      <AccountsList
        setAccountToEdit={setAccountToEdit}
        openAddModal={openAddModal}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        setOpenAddModal={setOpenAddModal}
        allTypesOfAccount={allTypesOfAccount}
      />

      <AddAccount
        accountToEdit={accountToEdit}
        isShown={openAddModal}
        setIsShown={setOpenAddModal}
        allTypesOfAccount={allTypesOfAccount}
      />
      <DeleteAccount
        accountToDelete={accountToEdit}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
    </>
  );
}

export default AccountsLayout;
