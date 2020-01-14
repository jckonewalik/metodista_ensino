import { createSelector } from 'reselect';
import { sortArrayByNumber } from '../../app/utils/utils';

const courseSelector = (state) => state.course;

export const currentCourseSelector = createSelector(
  courseSelector,
  (course) => course.currentCourse,
);

export const currentCourseLessonsSelector = createSelector(
  currentCourseSelector,
  (currentCourse) => {
    if (currentCourse && currentCourse.lessons) {
      return sortArrayByNumber({ array: currentCourse.lessons, attr: 'number', order: 'asc' });
    }
    return [];
  },
);
