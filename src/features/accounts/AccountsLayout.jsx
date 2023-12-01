import styled from 'styled-components';
import Heading from '../../ui/Heading';

import AddAccount from './AddAccount';
import AccountsList from './AccountsList';

import { useState } from 'react';

const Button = styled.button`
  background-color: #0ed95a;
  padding: 10px 10px;
  color: #212121;
  border-radius: 18px;
  text-transform: uppercase;
  font-size: 13px;
  border: 1px solid transparent;

  &:hover,
  &:focus {
    outline: none;
    border: 1px solid #0ed95a;
    color: #eee;
    background-color: transparent;
  }
`;

function AccountsLayout() {
  const [isShown, setIsShown] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState({});

  const allTypesOfAccount = [
    { type: 'debit', name: 'Debit Card' },
    { type: 'credit', name: 'Credit Card' },
    { type: 'saving', name: 'Saving Account' },
  ];

  function openAddAccountModal() {
    setIsShown(true);
    setAccountToEdit({});
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading>Accounts</Heading>
        <Button onClick={openAddAccountModal}>
          <span className="hidden sm:block">Add a new account</span>
          <span className="sm:hidden">Add &#x2B;</span>
        </Button>
      </div>

      <AccountsList
        setAccountToEdit={setAccountToEdit}
        isShown={isShown}
        setIsShown={setIsShown}
        allTypesOfAccount={allTypesOfAccount}
      />

      <AddAccount
        accountToEdit={accountToEdit}
        isShown={isShown}
        setIsShown={setIsShown}
        allTypesOfAccount={allTypesOfAccount}
      />
    </>
  );
}

export default AccountsLayout;
