import axios from 'axios';

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

export default transactionsApi;
