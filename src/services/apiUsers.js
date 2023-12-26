import axios from 'axios';

const usersApi = axios.create({
  baseURL: 'http://localhost:3500/users',
});

export const getUsers = async () => {
  const response = await usersApi.get('/');
  return response.data;
};

export const getUser = async ({ id }) => {
  const response = await usersApi.get(`/${id}`, id);
  return response.data;
};

export const getUserWithEmbedData = async ({ id }) => {
  const request = {
    params: {
      id,
      _embed: [
        'accounts',
        'expectedIncomes',
        'budgets',
        'transactions',
        'goals',
      ],
    },
  };
  const response = await usersApi.get(`/${id}`, request);
  return response.data;
};

export const createUser = async (user) => {
  return await usersApi.post('/', user);
};

export const editUser = async (user) => {
  return await usersApi.patch(`/${user.id}`, user);
};

export const deleteUser = async ({ id }) => {
  try {
    return await usersApi.delete(`/${id}`, id);
  } catch (error) {
    return null;
  }
};

export const login = async ({ email, password }) => {
  const allUsers = await getUsers();
  const userData = await allUsers.find((u) => u.email === email);

  if (userData && userData?.password === password) {
    try {
      const user = await getUser({ id: userData.id });
      sessionStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.log(error);
    }
  } else {
    throw new Error('Wrong email or password');
  }
};

export const logout = () => {
  sessionStorage.removeItem('user');
};

export const getCurrentUser = async () => {
  if (sessionStorage.getItem('user') !== null) {
    const sessionData = sessionStorage.getItem('user');
    const userId = JSON.parse(sessionData).id;
    return await getUserWithEmbedData({ id: userId });
  }
};

export default usersApi;
