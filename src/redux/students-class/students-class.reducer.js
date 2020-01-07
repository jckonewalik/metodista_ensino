import StudentsClassActionsType from './students-class.types';

const INITIAL_STATE = {
  currentClass: null,
  myClasses: [],
  errorMessage: '',
  isFechingCurrentClass: false,
  isFechingClasses: true,
};

const studentsClassReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case StudentsClassActionsType.SET_CURRENT_CLASS_START:
      return { ...state, isFechingCurrentClass: true };
    case StudentsClassActionsType.SET_CURRENT_CLASS_SUCCESS:
      return {
        ...state,
        isFechingCurrentClass: false,
        currentClass: action.payload,
      };
    case StudentsClassActionsType.SET_CURRENT_CLASS_FAILURE:
      return {
        ...state,
        isFechingCurrentClass: false,
        currentClass: null,
        errorMessage: action.payload,
      };
    case StudentsClassActionsType.FETCH_CLASSES_START:
      return { ...state, isFechingClasses: true };
    case StudentsClassActionsType.FETCH_CLASSES_SUCCESS:
      return {
        ...state,
        isFechingClasses: false,
        myClasses: action.payload,
      };
    case StudentsClassActionsType.FETCH_CLASSES_FAILURE:
      return {
        ...state,
        isFechingClasses: false,
        errorMessage: action.payload,
        myClasses: [],
      };
    default:
      return state;
  }
};

export default studentsClassReducer;
