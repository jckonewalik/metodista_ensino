import StudentsClassActionsType from './students-class.types';
import { handleErrorMessage } from '../../app/utils/utils';
import { list, get } from '../../services/student-class/student-class.services';

export const setCurrentClass = (selectedClass) => async (dispatch) => {
  dispatch({
    type: StudentsClassActionsType.SET_CURRENT_CLASS_START,
    payload: selectedClass,
  });
  try {
    const currentClass = await get(selectedClass);
    dispatch({ type: StudentsClassActionsType.SET_CURRENT_CLASS_SUCCESS, payload: currentClass });
  } catch (error) {
    const message = handleErrorMessage(error);
    dispatch({ type: StudentsClassActionsType.SET_CURRENT_CLASS_FAILURE, payload: message });
  }
};

export const fetchClasses = () => async (dispatch) => {
  dispatch({
    type: StudentsClassActionsType.FETCH_CLASSES_START,
  });
  try {
    const classes = await list();
    dispatch({ type: StudentsClassActionsType.FETCH_CLASSES_SUCCESS, payload: classes });
  } catch (error) {
    const message = handleErrorMessage(error);
    dispatch({ type: StudentsClassActionsType.FETCH_CLASSES_FAILURE, payload: message });
  }
};
