import api from './api';

export const list = async () => {
  const response = await api.get('/courses');
  const { courses } = await response.data;
  return courses;
};

export const get = async ({ id }) => {
  const response = await api.get(`/courses/${id}`);
  const { course } = await response.data;
  return course;
};

export const save = async ({ course }) => {
  let response;
  if (course.id) {
    response = await api.put(`/courses/${course.id}`, course);
  } else {
    response = await api.post('/courses', course);
  }
  const responseData = await response.data;
  return responseData;
};

export const remove = async ({ course }) => {
  const response = await api.delete(`/courses/${course.id}`);
  const responseData = await response.data;
  return responseData;
};
