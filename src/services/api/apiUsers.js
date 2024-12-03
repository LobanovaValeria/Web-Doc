import axios from 'axios';

export const getUsers = async () => {
  try {
    const resApp = await axios.get('https://simpleback-gwyn.onrender.com/users');
    return resApp.data;
  } catch (error) {
    console.log(error);
  }
};
export const postUsers = async (nameUser, emailUser, passwordUser) => {
  try {
    await axios.post('https://simpleback-gwyn.onrender.com/users', {
      name: nameUser.trim(),
      email: emailUser.trim(),
      password: passwordUser.trim(),
    });
  } catch (error) {
    console.log(error);
  }
};
