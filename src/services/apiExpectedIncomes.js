import { getCurrentUser } from './apiAuth';
import supabase from './supabase';
import { getMonth, getYear, parseISO } from 'date-fns';
import { currentMonth, currentYear } from '../utils/helpers';

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

export const getMonthlyExpectedIncome = async () => {
  const expectedIncomes = await getExpectedIncomes();
  const monthlyExpectedIncome = expectedIncomes?.find(
    (inc) =>
      getYear(parseISO(inc.created_at)) === currentYear &&
      getMonth(parseISO(inc.created_at)) === currentMonth
  );

  if (monthlyExpectedIncome) return monthlyExpectedIncome;
  return null;
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
