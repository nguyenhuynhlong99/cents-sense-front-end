import Heading from '../ui/Heading';
import { CreditCard } from '@phosphor-icons/react';
import AccountCard from '../ui/AccountCard';
import { data } from '../data/data';
import styled from 'styled-components';
import { useState } from 'react';
import Modal from '../ui/Modal';

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

function Accounts() {
  const [openModal, setOpenModal] = useState(false);

  const { accounts } = data;
  const userID = 1;
  const userAccounts = getAllUserAccounts(userID);
  const userCreditAccounts = userAccounts.filter(
    (acc) => acc.type === 'credit'
  );
  const userDebitAccounts = userAccounts.filter((acc) => acc.type === 'debit');
  const userSavingAccounts = userAccounts.filter(
    (acc) => acc.type === 'saving'
  );

  function getAllUserAccounts(userID) {
    return accounts.filter((acc) => acc.userID === userID);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading>Accounts</Heading>
        <Button onClick={() => setOpenModal(true)}>
          <span className="hidden sm:block">Add a new account</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      <div className="text-base">
        <section className="mt-5">
          <h3 className="text-lg font-semibold mb-2">Debit</h3>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,280px))] gap-5">
            {userDebitAccounts.map((acc) => (
              <AccountCard
                key={acc.accountID}
                balance={acc.balance}
                name={acc.name}
                color={acc.color}
              />
            ))}
          </div>
        </section>

        <section className="mt-5">
          <h3 className="text-lg font-semibold mb-2">Credit</h3>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,280px))] gap-5">
            {userCreditAccounts.map((acc) => (
              <AccountCard
                key={acc.accountID}
                balance={acc.balance}
                name={acc.name}
                color={acc.color}
              />
            ))}
          </div>
        </section>

        <section className="mt-5">
          <h3 className="text-lg font-semibold mb-2">Saving</h3>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,280px))] gap-5">
            {userSavingAccounts.map((acc) => (
              <AccountCard
                key={acc.accountID}
                balance={acc.balance}
                name={acc.name}
                color={acc.color}
              />
            ))}
          </div>
        </section>
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add a new account</Modal.Header>
        <Modal.Body>
          <form className="divide-y divide-neutral-700 text-base">
            <div className="py-3 grid grid-cols-1 items-center sm:grid-cols-[10em,_1fr]">
              <label
                htmlFor="name"
                className="font-semibold text-sm sm:text-base"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-transparent border border-neutral-500 rounded-md  w-full h-9 px-3 py-2 sm:max-w-[250px]"
              />
            </div>
            <div className="py-3 grid grid-cols-1 items-center sm:grid-cols-[10em,_1fr]">
              <label
                htmlFor="name"
                className="font-semibold text-sm sm:text-base"
              >
                Starting balance
              </label>
              <input
                type="text"
                id="name"
                className="bg-transparent border border-neutral-500 rounded-md  w-full h-9 px-3 py-2 sm:max-w-[250px]"
              />
            </div>
            <div className="py-3 grid grid-cols-1 items-center sm:grid-cols-[10em,_1fr]">
              <label
                htmlFor="name"
                className="font-semibold text-sm sm:text-base"
              >
                Type
              </label>
              <input
                type="text"
                id="name"
                className="bg-transparent border border-neutral-500 rounded-md  w-full h-9 px-3 py-2 sm:max-w-[250px]"
              />
            </div>
            <div></div>
          </form>
        </Modal.Body>
        <Modal.Footer>Footer</Modal.Footer>
      </Modal>
    </>
  );
}

export default Accounts;
