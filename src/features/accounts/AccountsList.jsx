import { useAccounts } from './useAccounts';

import AccountCard from '../../ui/AccountCard';
import Loader from '../../ui/Loader';
import { Pen, Trash } from '@phosphor-icons/react';
import ErrorBox from '../../ui/ErrorBox';

function AccountsList({
  openAddModal,
  setOpenAddModal,
  openDeleteModal,
  setOpenDeleteModal,
  allTypesOfAccount,
  accountToEdit,
  setAccountToEdit,
}) {
  const userId = 1;
  const { accounts, error, isLoading } = useAccounts();
  const userAccounts = getAllUserAccounts(userId);
  const userCreditAccounts = userAccounts?.filter(
    (acc) => acc.type === 'credit'
  );
  const userDebitAccounts = userAccounts?.filter((acc) => acc.type === 'debit');
  const userSavingAccounts = userAccounts?.filter(
    (acc) => acc.type === 'saving'
  );

  function getAllUserAccounts(userID) {
    return accounts?.filter((acc) => acc.userId === userId);
  }

  function openEditModal(item) {
    setOpenAddModal(true);
    setAccountToEdit(item);
  }

  function onOpenDeleteModal(item) {
    setAccountToEdit(item);
    setOpenDeleteModal(true);
  }

  if (isLoading) return <Loader />;

  if (error) {
    return <ErrorBox message="❌ There something went wrong!" />;
  }

  if (userAccounts?.length < 1) {
    return (
      <div className="max-w-[500px] m-auto lg:max-w-none lg:m-0 lg:flex lg:items-center lg:gap-3">
        <img
          className="max-w-[300px] m-auto lg:max-w-[400px] lg:m-0"
          src="Wallet-amico.svg"
          alt="manage accounts"
        />
        <div className="text-center">
          <h4 className="text-xl font-semibold text-green-500 sm:text-2xl lg:text-3xl">
            Launch your financial journey
          </h4>
          <p className="mt-3 text-base sm:text-lg lg:text-xl">
            Add your first account and kickstart smarter money management,
            effortlessly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="text-base">
        {userDebitAccounts?.length >= 1 && (
          <section className="mt-5">
            <h3 className="text-lg font-semibold mb-2">Debit</h3>

            <ul className="flex overflow-x-auto snap-x snap-mandatory gap-5 scroll-p-5 pb-3 sm:pb-0 sm:grid sm:grid-cols-[repeat(auto-fit,minmax(150px,280px))] sm:gap-5">
              {userDebitAccounts?.map((acc) => (
                <li
                  key={acc.id}
                  className="flex flex-col gap-2 flex-shrink-0 snap-center snap-always w-full max-w-[280px]"
                >
                  <AccountCard
                    balance={acc.balance}
                    name={acc.name}
                    color={acc.color}
                  />
                  <div className="flex items-center gap-2 m-auto">
                    <button
                      onClick={() => openEditModal(acc)}
                      className="rounded-md bg-green-700 p-3  hover:text-green-400 hover:bg-neutral-950 flex gap-1 items-center"
                    >
                      <Pen />
                      <span>Manage</span>
                    </button>
                    <button
                      onClick={() => onOpenDeleteModal(acc)}
                      className="rounded-md bg-red-700 p-3  hover:text-red-500 hover:bg-neutral-950 flex gap-1 items-center"
                    >
                      <Trash />
                      <span>Delete</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {userCreditAccounts?.length >= 1 && (
          <section className="mt-5">
            <h3 className="text-lg font-semibold mb-2">Credit</h3>

            <ul className="flex overflow-x-auto snap-x snap-mandatory gap-5 scroll-p-5 pb-3 sm:pb-0 sm:grid sm:grid-cols-[repeat(auto-fit,minmax(150px,280px))] sm:gap-5">
              {userCreditAccounts?.map((acc) => (
                <li
                  key={acc.id}
                  className="flex flex-col gap-2 flex-shrink-0 snap-center snap-always w-full max-w-[280px]"
                >
                  <AccountCard
                    balance={acc.balance}
                    name={acc.name}
                    color={acc.color}
                  />
                  <div className="flex items-center gap-2 m-auto">
                    <button
                      onClick={() => openEditModal(acc)}
                      className="rounded-md bg-green-700 p-3  hover:text-green-400 hover:bg-neutral-950 flex gap-1 items-center"
                    >
                      <Pen />
                      <span>Manage</span>
                    </button>
                    <button
                      onClick={() => onOpenDeleteModal(acc)}
                      className="rounded-md bg-red-700 p-3  hover:text-red-500 hover:bg-neutral-950 flex gap-1 items-center"
                    >
                      <Trash />
                      <span>Delete</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {userSavingAccounts?.length >= 1 && (
          <section className="mt-5">
            <h3 className="text-lg font-semibold mb-2">Saving</h3>

            <ul className="grid grid-cols-[repeat(auto-fit,minmax(150px,280px))] gap-5">
              {userSavingAccounts?.map((acc) => (
                <li
                  key={acc.id}
                  className="flex flex-col gap-2 flex-shrink-0 snap-center snap-always w-full max-w-[280px]"
                >
                  <AccountCard
                    balance={acc.balance}
                    name={acc.name}
                    color={acc.color}
                  />
                  <div className="flex items-center gap-2 m-auto">
                    <button
                      onClick={() => openEditModal(acc)}
                      className="rounded-md bg-green-700 p-3  hover:text-green-400 hover:bg-neutral-950 flex gap-1 items-center"
                    >
                      <Pen />
                      <span>Manage</span>
                    </button>
                    <button
                      onClick={() => onOpenDeleteModal(acc)}
                      className="rounded-md bg-red-700 p-3  hover:text-red-500 hover:bg-neutral-950 flex gap-1 items-center"
                    >
                      <Trash />
                      <span>Delete</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}

export default AccountsList;
