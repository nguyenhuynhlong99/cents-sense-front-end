import AccountsLayout from './AccountsLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

it('render AccountsLayout', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <AccountsLayout />
    </QueryClientProvider>
  );
  const addAccountBtn = screen.getByText(/Add your account/i);
  expect(addAccountBtn).toBeInTheDocument();
});

it('rendered heading should be Accounts', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <AccountsLayout />
    </QueryClientProvider>
  );
  const heading = screen.getByRole('heading');
  const headingText = screen.getByText(/Accounts/i);
  expect(heading).toBeInTheDocument();
  expect(headingText).toBeInTheDocument();
});
