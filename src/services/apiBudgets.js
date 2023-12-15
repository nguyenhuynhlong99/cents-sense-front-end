import axios from 'axios';

const budgetsApi = axios.create({
  baseURL: 'http://localhost:3500/budgets',
});

export const getBudgets = async () => {
  const response = await budgetsApi.get('/');
  return response.data;
};

export const getBudget = async ({ id }) => {
  const response = await budgetsApi.get(`/${id}`);
  return response.data;
};

export const createBudget = async (budget) => {
  return await budgetsApi.post('/', budget);
};

export const editBudget = async (budget) => {
  return await budgetsApi.patch(`/${budget.id}`, budget);
};

export const deleteBudget = async ({ id }) => {
  try {
    return await budgetsApi.delete(`/${id}`, id);
  } catch (error) {
    return null;
  }
};

export default budgetsApi;
