import MenuTypes from './menu.types';

const INITIAL_STATE = {
  toggled: false,
};

const menuReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MenuTypes.TOGGLE_MENU:
      return {
        ...state,
        toggled: !state.toggled,
      };
    default:
      return state;
  }
};

export default menuReducer;
