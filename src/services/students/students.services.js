import api from '../api';

export const saveStudent = async ({ student }) => {
  let response;
  if (student.id) {
    response = await api.put(`/students/${student.id}`, student);
  } else {
    response = await api.post('/students', student);
  }
  const responseData = await response.data;
  return responseData;
};

export const listStudents = async ({ name, page, pageSize }) => {
  const response = await api.get(`/students?name=${name}&page=${page}&pageSize=${pageSize}`);
  const responseData = await response.data;

  return responseData;
};

export const deleteStudent = async ({ student }) => {
  const response = await api.delete(`/students/${student.id}`);
  const responseData = await response.data;

  return responseData;
};
