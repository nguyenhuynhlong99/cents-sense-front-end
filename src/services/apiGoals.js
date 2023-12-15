import axios from 'axios';

const goalsApi = axios.create({
  baseURL: 'http://localhost:3500/savingsGoals',
});

export const getGoals = async () => {
  const response = await goalsApi.get('/');
  return response.data;
};

export const getGoal = async ({ id }) => {
  const response = await goalsApi.get(`/${id}`, id);
  return response.data;
};

export const createGoal = async (goal) => {
  return await goalsApi.post('/', goal);
};

export const editGoal = async (goal) => {
  return await goalsApi.patch(`/${goal.id}`, goal);
};

export const deleteGoal = async ({ id }) => {
  try {
    return await goalsApi.delete(`/${id}`, id);
  } catch (error) {
    return null;
  }
};

export default goalsApi;
