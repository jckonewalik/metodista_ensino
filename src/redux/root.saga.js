import { all, call } from 'redux-saga/effects';

import userSagas from './user/user.sagas';
import attendanceSagas from './attendance/attendance.sagas';
import studentsClassSagas from './students-class/students-class.sagas';

export default function* rootSaga() {
  yield all([call(userSagas), call(studentsClassSagas), call(attendanceSagas)]);
}
