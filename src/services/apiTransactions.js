import { editAccount, getAccount } from './apiAccounts';
import { editGoal, getGoal } from './apiGoals';
import supabase from './supabase';
import { getCurrentUser } from './apiAuth';

export const getTransactions = async ({ filter }) => {
  const userData = await getCurrentUser();

  let query = supabase
    .from('transactions')
    .select(
      'id, created_at, type, amount, description, toAccountId, accounts(name, type, balance), budgets(id, category, icon), goals(name)'
    )
    .eq('userId', userData?.id);

  if (filter) {
    query = query[filter.method || 'eq'](filter.field, filter.value);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error('Transactions could not be loaded');
  }

  return data;
};

export const createTransaction = async (transaction) => {
  const { data, error } = await supabase
    .from('transactions')
    .insert([{ ...transaction }])
    .select();

  if (error) throw new Error(error.message);

  return data;
};

export const addIncomeTransaction = async (transaction) => {
  const accountData = await getAccount(transaction.accountId);
  const previousAccountBalance = await accountData.balance;
  const newAccountBalance = previousAccountBalance + transaction.amount;

  const newData = { ...accountData, balance: newAccountBalance };

  try {
    return await Promise.all(
      editAccount(newData, transaction.accountId),
      createTransaction(transaction)
    );
  } catch (error) {}
};

export const addExpenseTransaction = async (transaction) => {
  const accountData = await getAccount(transaction.accountId);
  const previousAccountBalance = await accountData.balance;
  const accountType = await accountData.type;
  let newAccountBalance;
  if (accountType === 'debit' || accountType === 'saving') {
    newAccountBalance = previousAccountBalance - transaction.amount;
  } else {
    newAccountBalance = previousAccountBalance + transaction.amount;
  }

  if (newAccountBalance <= 0) {
    throw new Error('Insufficient balance!');
  }

  const newAccountData = { ...accountData, balance: newAccountBalance };

  try {
    return await Promise.all(
      editAccount(newAccountData, transaction.accountId),
      createTransaction(transaction)
    );
  } catch (error) {}
};

export const addTransferTransaction = async (transaction) => {
  const fromAccountData = await getAccount(transaction.accountId);
  const previousFromAccountBalance = await fromAccountData.balance;
  const fromAccountType = await fromAccountData.type;

  if (transaction.toAccountId) {
    const toAccountData = await getAccount(transaction.toAccountId);
    const previousToAccountBalance = await toAccountData.balance;
    const toAccountType = await toAccountData.type;

    const newFromAccountBalance =
      fromAccountType === 'credit'
        ? previousFromAccountBalance + transaction.amount
        : previousFromAccountBalance - transaction.amount;

    const newToAccountBalance =
      toAccountType === 'credit'
        ? previousToAccountBalance - transaction.amount
        : previousToAccountBalance + transaction.amount;

    if (fromAccountType !== 'credit' && newFromAccountBalance < 0) {
      throw new Error('Insufficient balance');
    }

    const newFromAccountData = {
      ...fromAccountData,
      balance: newFromAccountBalance,
    };

    const newToAccountData = { ...toAccountData, balance: newToAccountBalance };

    try {
      return await Promise.all(
        createTransaction(transaction),
        editAccount(newFromAccountData, transaction.accountId),
        editAccount(newToAccountData, transaction.toAccountId)
      );
    } catch (error) {}
  } else {
    const goalData = await getGoal(transaction.goalId);
    const goalCurrentAmount = await goalData.currentAmount;

    const newFromAccountBalance =
      fromAccountType === 'credit'
        ? previousFromAccountBalance + transaction.amount
        : previousFromAccountBalance - transaction.amount;
    const newGoalCurrentAmount = goalCurrentAmount + transaction.amount;

    if (fromAccountType !== 'credit' && newFromAccountBalance < 0) {
      throw new Error('Insufficient balance');
    }

    const newFromAccountData = {
      ...fromAccountData,
      balance: newFromAccountBalance,
    };
    const newGoalData = { ...goalData, currentAmount: newGoalCurrentAmount };

    try {
      return await Promise.all(
        createTransaction(transaction),
        editAccount(newFromAccountData, transaction?.accountId),
        editGoal(newGoalData, transaction?.goalId)
      );
    } catch (error) {}
  }
};
