import api from '../api';

export const list = async () => {
  const response = await api.get('/students-classes');
  const { studentsClasses } = await response.data;
  return studentsClasses;
};

export const get = async ({ id }) => {
  const response = await api.get(`/students-classes/${id}`);
  const { studentsClass } = await response.data;
  return studentsClass;
}
// put(setCurrentClassSuccess(studentsClass));
// } catch (error) {
//   const message = yield call(handleErrorMessage, error);
//   yield put(setSetCurrentClassFailure(message));
// }
