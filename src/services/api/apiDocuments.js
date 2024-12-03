import axios from 'axios';

export const getDocuments = async () => {
  try {
    const resApp = await axios.get('https://simpleback-gwyn.onrender.com/applications');
    return resApp.data;
  } catch (error) {
    console.log(error);
  }
};

export const postDocuments = async (id, docName) => {
  try {
    await axios.post('https://simpleback-gwyn.onrender.com/applications', {
      userId: id,
      documentName: docName.trim(),
    });
  } catch (error) {
    console.log(error);
  }
};
