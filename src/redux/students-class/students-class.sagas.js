import {
  all, call, takeLatest, put, select,
} from 'redux-saga/effects';
import api from '../../services/api';
import {
  fetchClassesSuccess, fetchClassesFailure, setSetCurrentClassFailure, setCurrentClassSuccess,
} from './students-class.actions';
import StudentsClassActionsType from './students-class.types';
import { currentUserTokenSelector } from '../user/user.selectors';

export function* fetchClasses() {
  try {
    const token = yield select(currentUserTokenSelector);
    const response = yield api
      .get('/students-classes',
        { headers: { Authorization: `Bearer ${token}` } });
    const { studentsClasses } = yield response.data;
    yield put(fetchClassesSuccess(studentsClasses));
  } catch (error) {
    const { data } = yield error.response;
    yield put(fetchClassesFailure(data));
  }
}

function* fethStudentsClass({ payload: { id } }) {
  try {
    const token = yield select(currentUserTokenSelector);
    const response = yield api
      .get(`/students-classes/${id}`,
        { headers: { Authorization: `Bearer ${token}` } });
    const { studentsClass } = yield response.data;
    yield put(setCurrentClassSuccess(studentsClass));
  } catch (error) {
    const { data } = yield error.response;
    yield put(setSetCurrentClassFailure(data));
  }
}

export function* onSetCurrentClassStart() {
  yield takeLatest(StudentsClassActionsType.SET_CURRENT_CLASS_START, fethStudentsClass);
}
export function* onGetClassesStart() {
  yield takeLatest(StudentsClassActionsType.FETCH_CLASSES_START, fetchClasses);
}

export default function* studentsClassSagas() {
  yield all([call(onGetClassesStart), call(onSetCurrentClassStart)]);
}
