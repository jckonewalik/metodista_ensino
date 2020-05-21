import AttendanceTypes from './attendance.types';

export const startAttendance = (studentsClass) => ({
  type: AttendanceTypes.START_ATTENDANCE,
  payload: studentsClass,
});

export const loadAttendance = (attendance) => ({
  type: AttendanceTypes.LOAD_ATTENDANCE,
  payload: attendance,
});

export const setAppointment = (appointment) => ({
  type: AttendanceTypes.SET_APPOINTMENT,
  payload: appointment,
});

export const setAttendanceDate = (date) => ({
  type: AttendanceTypes.SET_ATTENDANCE_DATE,
  payload: date,
});

export const setAttendanceTeacher = (teacher) => ({
  type: AttendanceTypes.SET_ATTENDANCE_TEACHER,
  payload: teacher,
});

export const setAttendanceLesson = (lesson) => ({
  type: AttendanceTypes.SET_ATTENDANCE_LESSON,
  payload: lesson,
});

export const saveAttendanceSuccess = () => ({
  type: AttendanceTypes.SAVE_ATTENDANCE_SUCCESS,
});
