import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppLayout from './ui/AppLayout';
import Home from './ui/Home';
import Overview from './pages/Overview';
import Budget from './pages/Budget';
import Goals from './pages/Goals';
import Transactions from './pages/Transactions';
import Accounts from './pages/Accounts';
import './index.css';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              backgroundColor: '#22c55e',
              color: '#0a0a0a',
              fontWeight: 600,
            },
          },
          error: {
            duration: 5000,
            style: {
              backgroundColor: '#ef4444',
              color: '#0a0a0a',
              fontWeight: 600,
            },
          },
          style: {
            fontSize: '15px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: '#71717a',
            color: '#fafafa',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
