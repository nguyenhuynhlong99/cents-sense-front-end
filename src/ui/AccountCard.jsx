import { CreditCard } from '@phosphor-icons/react';
import { formatCurrency } from '../utils/helpers';
// import MasterCardIcon from './MasterCardIcon';

function AccountCard({ balance, name, color = 'black' }) {
  function getColor() {
    switch (color) {
      case 'silver':
        return 'from-zinc-800 via-zinc-700 to-zinc-500';
      case 'gold':
        return 'from-[#C6B778] via-[#D8C989] to-[#DBD1AA] text-black';
      case 'green':
        return 'from-green-800 via-green-700 to-green-500';
      case 'blue':
        return 'from-blue-900 via-blue-800 to-blue-500';
      case 'brown':
        return 'from-amber-800 via-amber-700 to-amber-600';
      case 'red':
        return 'from-red-800 via-red-600 to-red-400';
      case 'pink':
        return 'from-pink-600 via-pink-400 to-pink-300';
      default:
        return 'from-neutral-950 via-neutral-900 to-neutral-800';
    }
  }

  return (
    <div
      className={`bg-gradient-to-r ${getColor()} rounded-2xl p-3 h-[150px] w-full`}
    >
      <div className="flex flex-col h-full">
        <div className="flex gap-2">
          <CreditCard size={20} />
          <span className="text-base   block max-w-350px]">{name}</span>
          {/* <MasterCardIcon /> */}
        </div>

        <div className="mt-auto">
          <span className="text-xs">Current Balance</span>
          <span className="block text-lg font-semibold">
            {formatCurrency(balance)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AccountCard;
