import { createSelector } from 'reselect';

const menuSelector = (state) => state.menu;

export const toggledMenuSelector = createSelector(
  menuSelector,
  (menu) => menu.toggled,
);
