/* eslint-disable no-case-declarations */
import AttendanceTypes from './attendance.types';
import { setAppointment } from './attendance.utils';

const INITIAL_STATE = {
  currentAttendance: {
    id: null,
    StudentsClassId: null,
    date: new Date(),
    Teacher: null,
    Lesson: null,
    appointments: [],
  },
  lessons: [],
};

const attendanceReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case AttendanceTypes.START_ATTENDANCE:
      const { id, students } = payload;
      const appointments = students.map((student) => ({ Student: student, status: null }));
      return {
        ...state,
        currentAttendance: {
          ...state.currentAttendance,
          StudentsClassId: id,
          Teacher: null,
          Lesson: null,
          appointments,
        },
      };
    case AttendanceTypes.LOAD_ATTENDANCE:
      return {
        ...state,
        currentAttendance: action.payload,
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
          Teacher: action.payload,
        },
      };
    case AttendanceTypes.SET_ATTENDANCE_LESSON:
      return {
        ...state,
        currentAttendance:
        {
          ...state.currentAttendance,
          Lesson: action.payload,
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
