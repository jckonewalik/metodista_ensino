import {
  all, call, takeLatest, put, select,
} from 'redux-saga/effects';
import api from '../../services/api';
import {
  setAttendanceAppointments,
  fetchLessonsListSuccess,
  fetchLessonsListFailure,
} from './attendance.actions';
import StudentsClassActionsType from '../students-class/students-class.types';
import { selectCurrentClass } from '../students-class/students-class.selectors';
import AttendanceTypes from './attendance.types';

function* createAttendanceItems() {
  const currentClass = yield select(selectCurrentClass);
  yield put(setAttendanceAppointments(
    currentClass.students.map((student) => ({ student, status: null })),
  ));
}

function* fetchLessonsList() {
  try {
    const studentsClass = yield select(selectCurrentClass);
    const response = yield api.get(`courses/${studentsClass.CourseId}/lessons`);
    const { lessons } = yield response.data;
    yield put(fetchLessonsListSuccess(lessons));
  } catch (error) {
    yield put(fetchLessonsListFailure());
  }
}

export function* onSetCurrentClassSuccess() {
  yield takeLatest(StudentsClassActionsType.SET_CURRENT_CLASS_SUCCESS, createAttendanceItems);
}

export function* onFetchLessonsListStart() {
  yield takeLatest(AttendanceTypes.FETCH_LESSONS_LIST_START, fetchLessonsList);
}

export default function* attendanceSagas() {
  yield all([call(onSetCurrentClassSuccess),
    call(onFetchLessonsListStart)]);
}
