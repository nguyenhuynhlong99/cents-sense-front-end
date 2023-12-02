import Logo from '../Logo';
import SidebarNavLink from './SidebarNavLink';

import {
  ArrowsLeftRight,
  CreditCard,
  CurrencyCircleDollar,
  FlagCheckered,
  SquaresFour,
  Wallet,
} from '@phosphor-icons/react';
import styles from './Sidebar.module.css';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside
      className={`${styles.sidebar} order-2 lg:order-1 lg:w-[180px] lg:p-4 xl:w-[220px]`}
    >
      <nav>
        <div
          onClick={() => navigate('/')}
          className="hidden text-center cursor-pointer lg:block"
        >
          <Logo />
        </div>
        <ul className="flex items-center justify-around text-xs pt-2 lg:pt-0 lg:mt-24 lg:flex-col lg:gap-3 lg:text-base lg:items-start">
          <li className="lg:w-full">
            <SidebarNavLink to="/overview">
              <SquaresFour size={18} />
              <span className={styles.navText}>Overview</span>
            </SidebarNavLink>
          </li>

          <li className="lg:w-full">
            <SidebarNavLink to="/accounts">
              <Wallet size={18} />
              <span className={styles.navText}>Accounts</span>
            </SidebarNavLink>
          </li>

          <li className="lg:w-full">
            <SidebarNavLink to="/budget">
              <CurrencyCircleDollar size={20} />
              <span className={styles.navText}>Budget</span>
            </SidebarNavLink>
          </li>

          <li className="lg:w-full">
            <SidebarNavLink to="/goals">
              <FlagCheckered size={18} />
              <span className={styles.navText}>Goals</span>
            </SidebarNavLink>
          </li>

          <li className="lg:w-full">
            <SidebarNavLink to="/transactions">
              <ArrowsLeftRight size={18} />
              <span className={styles.navText}>Transactions</span>
            </SidebarNavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
