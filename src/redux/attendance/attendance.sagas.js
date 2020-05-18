import {
  all, call, takeLatest, put, select,
} from 'redux-saga/effects';
import api from '../../services/api';
import {
  fetchLessonsListSuccess,
  fetchLessonsListFailure,
} from './attendance.actions';
import { selectCurrentClass } from '../students-class/students-class.selectors';
import AttendanceTypes from './attendance.types';
import { sortArrayByNumber } from '../../app/utils/utils';

function* fetchLessonsList() {
  try {
    const studentsClass = yield select(selectCurrentClass);
    const response = yield api.get(`courses/${studentsClass.CourseId}/lessons`);
    let { lessons } = yield response.data;
    lessons = sortArrayByNumber({ array: lessons, attr: 'number' });
    yield put(fetchLessonsListSuccess(lessons));
  } catch (error) {
    yield put(fetchLessonsListFailure());
  }
}

export function* onFetchLessonsListStart() {
  yield takeLatest(AttendanceTypes.FETCH_LESSONS_LIST_START, fetchLessonsList);
}

export default function* attendanceSagas() {
  yield all([
    call(onFetchLessonsListStart)]);
}
