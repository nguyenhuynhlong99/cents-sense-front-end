// import { data } from '../../../data/data';
import { useAccounts } from './useAccounts';

import AccountCard from '../../ui/AccountCard';
import Loader from '../../ui/Loader';

function AccountsList({
  isShown,
  setIsShown,
  allTypesOfAccount,
  setAccountToEdit,
}) {
  const userID = 1;
  const { accounts, isLoading } = useAccounts();
  const userAccounts = getAllUserAccounts(userID);
  const userCreditAccounts = userAccounts?.filter(
    (acc) => acc.type === 'credit'
  );
  const userDebitAccounts = userAccounts?.filter((acc) => acc.type === 'debit');
  const userSavingAccounts = userAccounts?.filter(
    (acc) => acc.type === 'saving'
  );

  function getAllUserAccounts(userID) {
    return accounts?.filter((acc) => acc.userID === userID);
  }

  function openEditModal(item) {
    setIsShown(true);
    setAccountToEdit(item);
  }

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="text-base">
        <section className="mt-5">
          <h3 className="text-lg font-semibold mb-2">Debit</h3>

          <ul className="grid grid-cols-[repeat(auto-fit,minmax(150px,280px))] gap-5">
            {userDebitAccounts.map((acc) => (
              <li key={acc.id} className="flex flex-col gap-2">
                <AccountCard
                  balance={acc.balance}
                  name={acc.name}
                  color={acc.color}
                />
                <button
                  onClick={() => openEditModal(acc)}
                  className="rounded-md bg-green-700  max-w-[100px] p-2 m-auto hover:text-green-400 hover:bg-neutral-950"
                >
                  Manage
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-5">
          <h3 className="text-lg font-semibold mb-2">Credit</h3>

          <ul className="grid grid-cols-[repeat(auto-fit,minmax(150px,280px))] gap-5">
            {userCreditAccounts.map((acc) => (
              <li key={acc.id} className="flex flex-col gap-2">
                <AccountCard
                  balance={acc.balance}
                  name={acc.name}
                  color={acc.color}
                />
                <button
                  onClick={() => openEditModal(acc)}
                  className="rounded-md bg-green-700  max-w-[100px] p-2 m-auto hover:text-green-400 hover:bg-neutral-950"
                >
                  Manage
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-5">
          <h3 className="text-lg font-semibold mb-2">Saving</h3>

          <ul className="grid grid-cols-[repeat(auto-fit,minmax(150px,280px))] gap-5">
            {userSavingAccounts.map((acc) => (
              <li key={acc.id} className="flex flex-col gap-2">
                <AccountCard
                  balance={acc.balance}
                  name={acc.name}
                  color={acc.color}
                />
                <button
                  onClick={() => openEditModal(acc)}
                  className="rounded-md bg-green-700  max-w-[100px] p-2 m-auto hover:text-green-400 hover:bg-neutral-950"
                >
                  Manage
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default AccountsList;
