import UserTypes from './user.types';

export const setCurrentUser = (user) => ({
  type: UserTypes.SET_CURRENT_USER,
  payload: user,
});

export const checkUserSessionStart = () => ({
  type: UserTypes.CHECK_USER_SESSION_START,
});

export const checkUserSessionFailure = () => ({
  type: UserTypes.CHECK_USER_SESSION_FAILURE,
});

export const checkUserSessionSuccess = () => ({
  type: UserTypes.CHECK_USER_SESSION_SUCCESS,
});
