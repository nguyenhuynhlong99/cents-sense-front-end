import { formatCurrency } from '../utils/helpers';
import MasterCardIcon from './MasterCardIcon';

function AccountCard({ balance, name }) {
  return (
    <div className="bg-gradient-to-r from-green-700 via-green-500 to-green-400 rounded-2xl p-3 h-[150px] w-full lg:max-w-none">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between">
          <span className="text-xl block max-w-350px]">{name}</span>
          <MasterCardIcon />
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
