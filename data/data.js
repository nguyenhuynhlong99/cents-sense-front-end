export const data = {
  users: [
    {
      userID: 1,
      email: 'user123@email.com',
      password: 'hashed_password',
      name: 'Long Nguyen',
    },
  ],
  accounts: [
    {
      accountID: 1,
      userID: 1,
      name: 'Check card',
      type: 'debit', // [credit, saving, debit]
      balance: 1000,
      color: 'neutral',
    },
    {
      accountID: 2,
      userID: 2,
      name: 'Check card',
      type: 'credit', // [credit, saving, debit]
      balance: 1000,
      color: 'neutral',
    },
    {
      accountID: 3,
      userID: 1,
      name: 'Chase credit card',
      type: 'credit', // [credit, saving, debit]
      balance: 0,
      color: 'blue',
    },
    {
      accountID: 4,
      userID: 1,
      name: 'Emergency HYSA',
      type: 'saving', // [credit, saving, debit]
      balance: 0,
      color: 'red',
    },
  ],
  transactions: [
    {
      transactionID: 1,
      userID: 1,
      accountID: 1,
      date: '2023-12-01',
      amount: 50.0,
      budgetID: 1,
      description: 'Grocery shopping',
      type: 'expense',
    },
    {
      transactionID: 4,
      userID: 1,
      accountID: 1,
      date: '2023-12-03',
      amount: 10.5,
      budgetID: 1,
      description: 'Grocery shopping',
      type: 'expense',
    },
    {
      transactionID: 2,
      userID: 1,
      accountID: 1,
      date: '2023-12-05',
      amount: 1200.0,
      budgetID: null,
      description: 'Monthly salary',
      type: 'income',
    },
    {
      transactionID: 3,
      userID: 1,
      accountID: 1,
      date: '2023-12-05',
      amount: 20.0,
      budgetID: 2,
      description: 'Netflix',
      type: 'expense',
    },
  ],
  budgets: [
    {
      budgetID: 1,
      userID: 1,
      category: 'food',
      amount: 300.0,
      createdAt: '2023-12-17T00:00:00.000Z',
    },
    {
      budgetID: 2,
      userID: 1,
      category: 'entertainment',
      amount: 100.0,
      createdAt: '2023-12-17T00:00:00.000Z',
    },
    {
      budgetID: 3,
      userID: 1,
      category: 'personal',
      amount: 100.0,
      createdAt: '2023-11-17T00:00:00.000Z',
    },
    {
      budgetID: 4,
      userID: 1,
      category: 'housing',
      amount: 700.0,
      createdAt: '2023-12-22T00:00:00.000Z',
    },
    {
      budgetID: 5,
      userID: 1,
      category: 'transportation',
      amount: 200.0,
      createdAt: '2023-12-22T00:00:00.000Z',
    },
  ],
  savingsGoals: [
    {
      goalID: 1,
      userID: 1,
      name: 'Europe Trip',
      targetAmount: 5000.0,
      currentAmount: 1200.0,
    },
    {
      goalID: 2,
      userID: 1,
      name: 'New Laptop',
      targetAmount: 1500.0,
      currentAmount: 600.0,
    },
  ],
};
