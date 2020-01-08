import HeaderActionTypes from './header.types';

export const setHeaderTitle = ({ title, subtitle }) => ({
  type: HeaderActionTypes.SET_HEADER_TITLE,
  payload: { title, subtitle },
});
