import api from './api';

export const get = async () => {
  await api.get('/sessions');
};
