import HeaderActionTypes from './header.types';

const INITIAL_STATE = {
  title: 'Metodista Ensino',
  subtitle: '',
};
const headerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HeaderActionTypes.SET_HEADER_TITLE:
      return {
        ...state,
        title: action.payload.title,
        subtitle: action.payload.subtitle,
      };
    default:
      return state;
  }
};

export default headerReducer;
