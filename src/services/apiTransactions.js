import axios from 'axios';
import { editAccount, getAccount } from './apiAccounts';
import { editGoal, getGoal } from './apiGoals';

const transactionsApi = axios.create({
  baseURL: 'http://localhost:3500/transactions',
});

export const getTransactions = async () => {
  const response = await transactionsApi.get('/');
  return response.data;
};

export const getTransaction = async ({ id }) => {
  const response = await transactionsApi.get(`/${id}`, id);
  return response.data;
};

export const createTransaction = async (transaction) => {
  return await transactionsApi.post('/', transaction);
};

export const editTransaction = async (transaction) => {
  return await transactionsApi.patch(`/${transaction.id}`, transaction);
};

export const deleteTransaction = async ({ id }) => {
  try {
    return await transactionsApi.delete(`/${id}`, id);
  } catch (error) {
    return null;
  }
};

export const getTransactionExpandAccountAndBudget = async ({ type }) => {
  const typeValue = !type || type === 'all' ? null : { type };

  const request = typeValue
    ? {
        params: {
          _expand: ['account', 'budget'],
          ...typeValue,
        },
      }
    : {
        params: {
          _expand: ['account', 'budget'],
        },
      };

  const response = await transactionsApi.get('/', request);

  return response.data;
};

export const addIncomeTransaction = async (transaction) => {
  const accountData = await getAccount({ id: transaction.accountId });
  const previousAccountBalance = await accountData.balance;
  const newAccountBalance = previousAccountBalance + transaction.amount;

  try {
    return await Promise.all(
      editAccount({ ...accountData, balance: newAccountBalance }),
      createTransaction(transaction)
    );
  } catch (error) {
    return null;
  }
};

export const addExpenseTransaction = async (transaction) => {
  const accountData = await getAccount({ id: transaction.accountId });
  const previousAccountBalance = await accountData.balance;
  const accountType = await accountData.type;
  let newAccountBalance;
  if (accountType === 'debit' || accountType === 'saving') {
    newAccountBalance = previousAccountBalance - transaction.amount;
  } else {
    newAccountBalance = previousAccountBalance + transaction.amount;
  }

  if (newAccountBalance <= 0) {
    throw new Error('Insufficient balance!');
  }

  try {
    return await Promise.all(
      editAccount({ ...accountData, balance: newAccountBalance }),
      createTransaction(transaction)
    );
  } catch (error) {
    console.log(error);
  }
};

export const addTransferTransaction = async (transaction) => {
  const fromAccountData = await getAccount({ id: transaction.accountId });
  const previousFromAccountBalance = await fromAccountData.balance;
  const fromAccountType = await fromAccountData.type;

  if (transaction.toAccountId !== 0) {
    const toAccountData = await getAccount({ id: transaction.toAccountId });
    const previousToAccountBalance = await toAccountData.balance;
    const toAccountType = await toAccountData.type;

    const newFromAccountBalance =
      fromAccountType === 'credit'
        ? previousFromAccountBalance + transaction.amount
        : previousFromAccountBalance - transaction.amount;

    const newToAccountBalance =
      toAccountType === 'credit'
        ? previousToAccountBalance - transaction.amount
        : previousToAccountBalance + transaction.amount;

    if (fromAccountType !== 'credit' && newFromAccountBalance < 0) {
      throw new Error('Insufficient balance');
    }

    try {
      return await Promise.all(
        createTransaction(transaction),
        editAccount({ ...fromAccountData, balance: newFromAccountBalance }),
        editAccount({ ...toAccountData, balance: newToAccountBalance })
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    const goalData = await getGoal({ id: transaction.goalId });
    const goalCurrentAmount = await goalData.currentAmount;

    const newFromAccountBalance =
      fromAccountType === 'credit'
        ? previousFromAccountBalance + transaction.amount
        : previousFromAccountBalance - transaction.amount;
    const newGoalCurrentAmount = goalCurrentAmount + transaction.amount;

    if (fromAccountType !== 'credit' && newFromAccountBalance < 0) {
      throw new Error('Insufficient balance');
    }

    try {
      return await Promise.all(
        createTransaction(transaction),
        editAccount({ ...fromAccountData, balance: newFromAccountBalance }),
        editGoal({ ...goalData, currentAmount: newGoalCurrentAmount })
      );
    } catch (error) {
      console.log(error);
    }
  }
};

export default transactionsApi;
