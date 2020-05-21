import api from './api';

export const remove = async ({ lesson }) => {
  const response = await api.delete(`/lessons/${lesson.id}`);
  const responseData = await response.data;
  return responseData;
};
