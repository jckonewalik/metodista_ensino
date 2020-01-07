import { createSelector } from 'reselect';

const selectStudentClass = (state) => state.studentsClass;

export const selectCurrentClass = createSelector(
  [selectStudentClass],
  (studentsClass) => studentsClass.currentClass,
);

export const selectTeachersCurrentClass = createSelector(
  [selectCurrentClass],
  (currentClass) => currentClass.teachers,
);

export const selectIsFechingClasses = createSelector(
  [selectStudentClass],
  (studentsClass) => studentsClass.isFechingClasses,
);
export const selectIsFechingCurrentClass = createSelector(
  [selectStudentClass],
  (studentsClass) => studentsClass.isFechingCurrentClass,
);
export const selectMyClasses = createSelector(
  [selectStudentClass],
  (studentsClass) => studentsClass.myClasses,
);
