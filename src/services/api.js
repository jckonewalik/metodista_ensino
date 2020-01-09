import axios from 'axios';
import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();

const api = axios.create({
  baseURL: env.REACT_APP_SERVER_URL || 'http://127.0.0.1:5000',
});
export default api;
