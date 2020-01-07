import 'date-fns';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AttendanceOverview from '../../components/attendance-overview/attendance-overview.component';
import AttendanceList from '../../components/attendance-list/attendance-list.component';
import { setAttendanceDate } from '../../../redux/attendance/attendance.actions';
import { selectAttendanceDate, selectAttendancesComplete } from '../../../redux/attendance/attendance.selectors';
import { selectCurrentClass, selectIsFechingCurrentClass } from '../../../redux/students-class/students-class.selectors';
import {
  ButtonContainerStyled,
  CustomButtonStyled,
  AttendanceListContainerStyled,
} from './attendance.styles';
import DatePickerBarComponent from '../../components/date-picker-bar/date-picker-bar.component';

const AttendancePage = () => {
  const dispatch = useDispatch();
  const currentClass = useSelector(selectCurrentClass);
  const isFetchingCurrentClass = useSelector(selectIsFechingCurrentClass);
  const attendanceDate = useSelector(selectAttendanceDate);
  const attendancesComplete = useSelector(selectAttendancesComplete);

  const selectDate = (newdate) => {
    dispatch(setAttendanceDate(newdate));
  };
  return (
    !currentClass && !isFetchingCurrentClass ? <Redirect to="/attendance/my-classes" />
      : (
        <div>
          <AttendanceOverview />
          <AttendanceListContainerStyled>
            <DatePickerBarComponent handleChange={selectDate} date={attendanceDate} />
            <AttendanceList />
          </AttendanceListContainerStyled>
          <ButtonContainerStyled>
            <CustomButtonStyled
              disabled={!attendancesComplete}
              onClick={() => {}}
            >
          SALVAR
            </CustomButtonStyled>
          </ButtonContainerStyled>
        </div>
      )
  );
};

export default AttendancePage;
