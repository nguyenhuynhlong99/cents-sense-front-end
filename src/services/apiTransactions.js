import axios from 'axios';
import { editAccount, getAccount } from './apiAccounts';

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

export default transactionsApi;
