import {
  call, all, put, takeLatest,
} from 'redux-saga/effects';
import UserTypes from './user.types';
import { checkUserSessionFailure, checkUserSessionSuccess } from './user.actions';
import api from '../../services/api';

function* checkUserSession() {
  try {
    yield api.get('/sessions');
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
