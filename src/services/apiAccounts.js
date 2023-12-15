import axios from 'axios';

const accountsApi = axios.create({
  baseURL: 'http://localhost:3500/accounts',
});

export const getAccounts = async () => {
  const response = await accountsApi.get('/');
  return response.data;
};

export const getAccount = async ({ id }) => {
  const response = await accountsApi.get(`/${id}`, id);
  return response.data;
};

export const createAccount = async (account) => {
  return await accountsApi.post('/', account);
};

export const editAccount = async (account) => {
  return await accountsApi.patch(`/${account.id}`, account);
};

export const deleteAccount = async ({ id }) => {
  try {
    return await accountsApi.delete(`/${id}`, id);
  } catch {
    return null;
  }
};

export default accountsApi;
