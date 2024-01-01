import axios from 'axios';
import supabase from './supabase';

import { getCurrentUser } from './apiAuth';

const accountsApi = axios.create({
  baseURL: 'http://localhost:3500/accounts',
});

export const getAccounts = async () => {
  const userData = await getCurrentUser();

  const { data, error } = await supabase
    .from('accounts')
    .select('*')
    .eq('userId', userData?.id);

  if (error) {
    console.error(error);
    throw new Error('Accounts could not be loaded');
  }

  return data;
};

export const getAccount = async (id) => {
  if (!id) return null;
  const { data, error } = await supabase
    .from('accounts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error('Could not loaded this account');

  return data;
};

export const createAccount = async (account) => {
  const { data, error } = await supabase
    .from('accounts')
    .insert([{ ...account }])
    .select();

  if (error) throw new Error(error.message);

  return data;
};

export const editAccount = async (account, id) => {
  const { data, error } = await supabase
    .from('accounts')
    .update({ ...account })
    .eq('id', id)
    .select();

  if (error) throw new Error(error.message);

  return data;
};

export const deleteAccount = async (id) => {
  const { error } = await supabase.from('accounts').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Account could not be deleted');
  }
};

export default accountsApi;
