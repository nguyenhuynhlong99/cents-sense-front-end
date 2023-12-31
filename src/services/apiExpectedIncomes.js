import axios from 'axios';
import { getCurrentUser } from './apiAuth';
import supabase from './supabase';

const expectedIncomeApi = axios.create({
  baseURL: 'http://localhost:3500/expectedIncomes',
});

export const getExpectedIncomes = async () => {
  const userData = await getCurrentUser();

  const { data, error } = await supabase
    .from('expectedIncomes')
    .select('*')
    .eq('userId', userData?.id);

  if (error) {
    console.error(error);
    throw new Error('Expected incomes could not be loaded');
  }

  return data;
};

export const createExpectedIncome = async (expectedIncome) => {
  const { data, error } = await supabase
    .from('expectedIncomes')
    .insert([{ ...expectedIncome }])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Something went wrong');
  }

  return data;
};

export default expectedIncomeApi;
