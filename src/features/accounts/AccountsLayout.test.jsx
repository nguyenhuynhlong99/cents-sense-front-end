import AccountsLayout from './AccountsLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeAll, describe, expect } from 'vitest';
import { server } from '../../tests/server';

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithClient = (ui) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe('AccountsLayout', () => {
  it('should render heading Accounts', async () => {
    renderWithClient(<AccountsLayout />);

    await waitFor(() => {
      const heading = screen.getByRole('heading', { name: /Accounts/i });
      expect(heading).toBeInTheDocument();
    });
  });
});
