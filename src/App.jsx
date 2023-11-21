import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Home from './ui/Home';
import Overview from './pages/Overview';
import Budget from './pages/Budget';
import Goals from './pages/Goals';
import Transactions from './pages/Transactions';
import './index.css';
import Accounts from './pages/Accounts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route element={<AppLayout />}>
          <Route path="overview" element={<Overview />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="budget" element={<Budget />} />
          <Route path="goals" element={<Goals />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
