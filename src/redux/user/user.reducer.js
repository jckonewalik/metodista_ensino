import UserTypes from './user.types';

const INITIAL_DATA = {
  currentUser: null,
};

const userReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case UserTypes.LOGOUT_USER:
      return {
        ...state,
        currentUser: undefined,
      };
    case UserTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserTypes.CHECK_USER_SESSION_FAILURE:
      return {
        ...state,
        currentUser: undefined,
      };
    default:
      return state;
  }
};

export default userReducer;
