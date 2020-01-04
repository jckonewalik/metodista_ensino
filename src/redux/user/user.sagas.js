import {
  call, all, put, takeLatest, select,
} from 'redux-saga/effects';
import UserTypes from './user.types';
import { checkUserSessionFailure, checkUserSessionSuccess } from './user.actions';
import { currentUserTokenSelector } from './user.selectors';
import api from '../../services/api';

function* checkUserSession() {
  const token = yield select(currentUserTokenSelector);
  try {
    yield api.get('/sessions', { headers: { Authorization: `Bearer ${token}` } });
    yield put(checkUserSessionSuccess());
  } catch (error) {
    yield put(checkUserSessionFailure());
  }
}

function* onCheckUserSessionStart() {
  yield takeLatest(UserTypes.CHECK_USER_SESSION_START, checkUserSession);
}

export default function* userSagas() {
  yield all([
    call(onCheckUserSessionStart),
  ]);
}
