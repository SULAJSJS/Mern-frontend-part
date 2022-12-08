import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mern-backend-part.onrender.com',
  // baseURL: 'https://mern-backend-part.onrender.com',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
