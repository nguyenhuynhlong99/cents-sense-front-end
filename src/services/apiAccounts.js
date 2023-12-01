import axios from 'axios';

const accountsApi = axios.create({
  baseURL: 'http://localhost:3500',
});

export const getAccounts = async () => {
  const response = await accountsApi.get('/accounts');
  return response.data;
};

export const getAccount = async ({ id }) => {
  const response = await accountsApi.get(`/accounts/${id}`);
  return response.data;
};

export const createAccount = async (account) => {
  return await accountsApi.post('/accounts', account);
};

export const editAccount = async (account) => {
  return await accountsApi.patch(`/accounts/${account.id}`, account);
};

export const deleteAccount = async ({ id }) => {
  return await accountsApi.delete(`/accounts/${id}`, id);
};

export default accountsApi;
