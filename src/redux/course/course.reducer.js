import CouseActionsType from './course.types';

const INITIAL_STATE = {
  currentCourse: {
    id: undefined,
    name: '',
    active: true,
    lessons: [],
  },
};

const courseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CouseActionsType.SET_CURRENT_COURSE:
      return {
        ...state,
        currentCourse: action.payload,
      };
    case CouseActionsType.SET_COURSE_LESSONS:
      return {
        ...state,
        currentCourse: {
          ...state.currentCourse,
          lessons: action.payload,
        },
      };
    default:
      return state;
  }
};

export default courseReducer;
