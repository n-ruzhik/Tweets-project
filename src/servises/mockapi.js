import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.baseURL = 'https://6468bc1860c8cb9a2cb0a970.mockapi.io';

async function fetchTweets(page = 1) {
  try {
    const response = await axios.get(`/users?page=${page}&limit=3`);
    if (!response) {
      Notiflix.Notify.failure('Please, try again');
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchAllTweets() {
  try {
    const response = await axios.get('/users');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const api = {
  fetchTweets,
  fetchAllTweets,
};
export default api;
