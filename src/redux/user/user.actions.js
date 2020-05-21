import UserTypes from './user.types';
import * as service from '../../services/users.services';

export const setCurrentUser = (user) => ({
  type: UserTypes.SET_CURRENT_USER,
  payload: user,
});

export const checkUserSession = () => async (dispatch) => {
  dispatch({ type: UserTypes.CHECK_USER_SESSION_START });
  try {
    await service.get('/sessions');
    dispatch({ type: UserTypes.CHECK_USER_SESSION_SUCCESS });
  } catch (error) {
    dispatch({ type: UserTypes.CHECK_USER_SESSION_FAILURE });
  }
};

export const checkUserSessionFailure = () => ({
  type: UserTypes.CHECK_USER_SESSION_FAILURE,
});

export const checkUserSessionSuccess = () => ({
  type: UserTypes.CHECK_USER_SESSION_SUCCESS,
});

export const logoutUser = () => ({
  type: UserTypes.LOGOUT_USER,
});
