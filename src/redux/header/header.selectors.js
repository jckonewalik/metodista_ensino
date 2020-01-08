import { createSelector } from 'reselect';

const headerSelector = (state) => state.header;

export const headerTitleSelector = createSelector(
  headerSelector,
  (header) => header.title,
);

export const headerSubtitleSelector = createSelector(
  headerSelector,
  (header) => header.subtitle,
);
