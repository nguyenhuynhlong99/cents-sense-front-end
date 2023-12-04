import axios from 'axios';

const expectedIncomeApi = axios.create({
  baseURL: 'http://localhost:3500/expectedIncome',
});

export const getExpectedIncomes = async () => {
  const response = await expectedIncomeApi.get('/');
  return response.data;
};

export const createExpectedIncome = async (expectedIncome) => {
  return await expectedIncomeApi.post('/', expectedIncome);
};

export default expectedIncomeApi;
