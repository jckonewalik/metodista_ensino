import CourseActionsType from './course.types';

export const setCurrentCourse = (course) => ({
  payload: course,
  type: CourseActionsType.SET_CURRENT_COURSE,
});

export const setCourseLessons = (lessons) => ({
  payload: lessons,
  type: CourseActionsType.SET_COURSE_LESSONS,
});
