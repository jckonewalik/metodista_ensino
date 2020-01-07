import StudentsClassActionsType from './students-class.types';

export const setCurrentClassStart = (selectedClass) => ({
  type: StudentsClassActionsType.SET_CURRENT_CLASS_START,
  payload: selectedClass,
});

export const setCurrentClassSuccess = (studentsClass) => ({
  type: StudentsClassActionsType.SET_CURRENT_CLASS_SUCCESS,
  payload: studentsClass,
});

export const setSetCurrentClassFailure = (error) => ({
  type: StudentsClassActionsType.SET_CURRENT_CLASS_FAILURE,
  payload: error.message,
});

export const fetchClassesStart = () => ({
  type: StudentsClassActionsType.FETCH_CLASSES_START,
});

export const fetchClassesSuccess = (classes) => ({
  type: StudentsClassActionsType.FETCH_CLASSES_SUCCESS,
  payload: classes,
});

export const fetchClassStudentsStart = (classId) => ({
  type: StudentsClassActionsType.FETCH_CLASS_STUDENTS_START,
  payload: classId,
});

export const fetchClassesFailure = (error) => ({
  type: StudentsClassActionsType.FETCH_CLASSES_FAILURE,
  payload: error.message,
});
