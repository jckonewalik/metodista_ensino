import AttendanceTypes from './attendance.types';
import { setAppointment } from './attendance.utils';

const INITIAL_STATE = {
  currentAttendance: {
    date: new Date(),
    appointments: [],
    teacher: null,
    lesson: null,
  },
  lessons: [],
};

const attendanceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AttendanceTypes.SET_ATTENDANCE_APPOINTMENTS:
      return {
        ...state,
        currentAttendance: {
          ...state.currentAttendance, teacher: null, lesson: null, appointments: action.payload,
        },
      };
    case AttendanceTypes.SET_APPOINTMENT:
      return {
        ...state,
        currentAttendance:
        {
          ...state.currentAttendance,
          appointments: setAppointment(state.currentAttendance.appointments, action.payload),
        },
      };
    case AttendanceTypes.SET_ATTENDANCE_DATE:
      return {
        ...state,
        currentAttendance:
        {
          ...state.currentAttendance,
          date: action.payload,
        },
      };
    case AttendanceTypes.SET_ATTENDANCE_TEACHER:
      return {
        ...state,
        currentAttendance:
        {
          ...state.currentAttendance,
          teacher: action.payload,
        },
      };
    case AttendanceTypes.SET_ATTENDANCE_LESSON:
      return {
        ...state,
        currentAttendance:
        {
          ...state.currentAttendance,
          lesson: action.payload,
        },
      };
    case AttendanceTypes.SAVE_ATTENDANCE_SUCCESS:
      return {
        ...INITIAL_STATE,
      };
    case AttendanceTypes.FETCH_LESSONS_LIST_SUCCESS:
      return {
        ...state,
        lessons: action.payload,
      };
    default:
      return state;
  }
};

export default attendanceReducer;
