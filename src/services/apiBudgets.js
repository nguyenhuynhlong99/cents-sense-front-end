import axios from 'axios';
import { getCurrentUser } from './apiAuth';
import supabase from './supabase';

const budgetsApi = axios.create({
  baseURL: 'http://localhost:3500/budgets',
});

export const getBudgets = async () => {
  const userData = await getCurrentUser();

  const { data, error } = await supabase
    .from('budgets')
    .select('*')
    .eq('userId', userData?.id);

  if (error) {
    console.error(error);
    throw new Error('Budgets could not be loaded');
  }

  return data;
};

export const getBudget = async ({ id }) => {
  const response = await budgetsApi.get(`/${id}`);
  return response.data;
};

export const createBudget = async (budget) => {
  const { data, error } = await supabase
    .from('budgets')
    .insert([{ ...budget }])
    .select();

  if (error) throw new Error(error.message);

  return data;
};

export const editBudget = async (budget, id) => {
  const { data, error } = await supabase
    .from('budgets')
    .update({ ...budget })
    .eq('id', id)
    .select();

  if (error) throw new Error(error.message);

  return data;
};

export const deleteBudget = async (id) => {
  const { error } = await supabase.from('budgets').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Budget could not be deleted');
  }
};

export default budgetsApi;
