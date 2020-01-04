import { createSelector } from 'reselect';

const userSelector = (state) => state.user;

export const currentUserSelector = createSelector(
  userSelector,
  (user) => user.currentUser,
);

export const currentUserTokenSelector = createSelector(
  [currentUserSelector],
  (currentUser) => currentUser.token,
);