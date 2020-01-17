import { createSelector } from 'reselect';

const userSelector = (state) => state.user;

export const currentUserSelector = createSelector(
  userSelector,
  (user) => user.currentUser,
);

export const currentUserTokenSelector = createSelector(
  [currentUserSelector],
  (currentUser) => currentUser && currentUser.token,
);

export const isAdminUserSelector = createSelector(
  [currentUserSelector],
  (currentUser) => {
    if (currentUser && currentUser.roles) {
      const idx = currentUser.roles.indexOf('ROLE_ADMIN');
      return idx !== -1;
    }
    return false;
  },
);
