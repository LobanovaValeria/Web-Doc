import axios from 'axios';

export const getUsers = async () => {
  try {
    const resApp = await axios.get('http://localhost:3001/users');
    return resApp.data;
  } catch (error) {
    console.log(error);
  }
};
export const postUsers = async (nameUser, emailUser, passwordUser) => {
  try {
    await axios.post('http://localhost:3001/users', {
      name: nameUser.trim(),
      email: emailUser.trim(),
      password: passwordUser.trim(),
    });
  } catch (error) {
    console.log(error);
  }
};
