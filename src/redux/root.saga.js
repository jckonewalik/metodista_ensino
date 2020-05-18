import { all, call } from 'redux-saga/effects';

import userSagas from './user/user.sagas';
import attendanceSagas from './attendance/attendance.sagas';

export default function* rootSaga() {
  yield all([call(userSagas), call(attendanceSagas)]);
}
