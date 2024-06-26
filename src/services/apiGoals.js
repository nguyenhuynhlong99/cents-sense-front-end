import supabase from './supabase';
import { getCurrentUser } from './apiAuth';

export const getGoals = async () => {
  const userData = await getCurrentUser();

  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .eq('userId', userData?.id);

  if (error) {
    console.error(error);
    throw new Error('Goals could not be loaded');
  }

  return data;
};

export const getGoal = async (id) => {
  if (!id) return;
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error('Could not loaded this account');

  return data;
};

export const createGoal = async (goal) => {
  const { data, error } = await supabase
    .from('goals')
    .insert([{ ...goal }])
    .select();

  if (error) throw new Error(error.message);

  return data;
};

export const editGoal = async (goal, id) => {
  const { data, error } = await supabase
    .from('goals')
    .update({ ...goal })
    .eq('id', id)
    .select();

  if (error) throw new Error(error.message);

  return data;
};

export const deleteGoal = async (id) => {
  const { error } = await supabase.from('goals').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Goal could not be deleted');
  }
};
