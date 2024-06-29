import AccountsLayout from './AccountsLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

describe('AccountsLayout', () => {
  it('should render heading Accounts', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AccountsLayout />
      </QueryClientProvider>
    );
    const heading = screen.getByRole('heading', { name: /Accounts/i });
    expect(heading).toBeInTheDocument();
  });

  it('should render "Add your account" button', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AccountsLayout />
      </QueryClientProvider>
    );
    const addAccountBtn = screen.getByText(/Add your account/i);
    expect(addAccountBtn).toBeInTheDocument();
  });
});
