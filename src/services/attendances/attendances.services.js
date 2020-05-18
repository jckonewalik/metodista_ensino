import api from '../api';

export const post = async (attendance) => {
  await api.post('/attendances', attendance);
  return true;
};
