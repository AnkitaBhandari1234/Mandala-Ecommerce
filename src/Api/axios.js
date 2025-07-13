import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // your backend base URL + prefix
  withCredentials: true,                 // for cookies, if needed
});

export default api;
