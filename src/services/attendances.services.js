import api from './api';

export const save = async (attendance) => {
  await api.post('/attendances', attendance);
  return true;
};

export const findOne = async ({ id, date }) => {
  const response = await api.get('/attendances', { params: { StudentsClassId: id, date } });
  const attendance = await response.data;
  return attendance;
};
