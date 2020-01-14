import axios from 'axios';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import { store } from '../redux/store';

const env = runtimeEnv();

const api = axios.create({
  baseURL: env.REACT_APP_SERVER_URL || 'http://127.0.0.1:5000',
});

api.interceptors.request.use((config) => {
  let token;
  try {
    token = store.getState().user.currentUser.token;
  } catch {
    token = null;
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
