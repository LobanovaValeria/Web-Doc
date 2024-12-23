import axios from 'axios';

export const getDocuments = async () => {
  try {
    const resApp = await axios.get('http://localhost:3001/applications');
    return resApp.data;
  } catch (error) {
    console.log(error);
  }
};

export const postDocuments = async (id, docName) => {
  try {
    await axios.post('http://localhost:3001/applications', {
      userId: id,
      documentName: docName.trim(),
    });
  } catch (error) {
    console.log(error);
  }
};
