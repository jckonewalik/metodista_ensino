import { createSelector } from 'reselect';
import { sortArrayByString } from '../../app/utils/utils';

const selectStudentClass = (state) => state.studentsClass;

export const selectCurrentClass = createSelector(
  [selectStudentClass],
  (studentsClass) => studentsClass.currentClass,
);

export const selectTeachersCurrentClass = createSelector(
  [selectCurrentClass],
  (currentClass) => (currentClass && sortArrayByString({ array: currentClass.teachers, attr: 'firstName' })) || [],
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
  (studentsClass) => studentsClass.myClasses || [],
);
