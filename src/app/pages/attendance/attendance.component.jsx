import 'date-fns';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AttendanceOverview from '../../components/attendance-overview/attendance-overview.component';
import AttendanceList from '../../components/attendance-list/attendance-list.component';
import { startAttendance, loadAttendance, setAttendanceDate } from '../../../redux/attendance/attendance.actions';
import { selectAttendanceDate, selectAttendancesComplete } from '../../../redux/attendance/attendance.selectors';
import { selectCurrentClass, selectIsFechingCurrentClass } from '../../../redux/students-class/students-class.selectors';
import {
  MainContainer,
  ButtonContainerStyled,
  CustomButtonStyled,
  AttendanceListContainerStyled,
} from './attendance.styles';
import * as service from '../../../services/attendances.services';
import { setHeaderTitle } from '../../../redux/header/header.actions';
import DatePickerBarComponent from '../../components/date-picker-bar/date-picker-bar.component';


const AttendancePage = ({ match, history }) => {
  const dispatch = useDispatch();
  const currentClass = useSelector(selectCurrentClass);
  const isFetchingCurrentClass = useSelector(selectIsFechingCurrentClass);
  const attendanceDate = useSelector(selectAttendanceDate);
  const attendancesComplete = useSelector(selectAttendancesComplete);

  useEffect(() => {
    dispatch(setHeaderTitle({
      title: currentClass && currentClass.name,
      subtitle: currentClass && currentClass.description,
    }));
  }, [dispatch, currentClass]);

  useEffect(() => {
    const loadOrStartAttendance = async (studentsClass) => {
      if (studentsClass) {
        const foundAttendance = await service.findOne({ id: studentsClass.id, date: new Date() });
        if (foundAttendance) {
          dispatch(loadAttendance(foundAttendance));
        } else {
          dispatch(startAttendance(studentsClass));
        }
      }
    };
    loadOrStartAttendance(currentClass);
  }, [dispatch, currentClass]);

  const selectDate = async (newdate) => {
    const foundAttendance = await service.findOne({ id: currentClass.id, date: newdate });
    if (foundAttendance) {
      dispatch(loadAttendance(foundAttendance));
    } else {
      dispatch(setAttendanceDate(newdate));
    }
  };
  return (
    !currentClass && !isFetchingCurrentClass ? <Redirect to="/attendance/my-classes" />
      : (
        <MainContainer>
          <AttendanceOverview />
          <AttendanceListContainerStyled>
            <DatePickerBarComponent handleChange={selectDate} date={attendanceDate} />
            <AttendanceList />
          </AttendanceListContainerStyled>
          <ButtonContainerStyled>
            <CustomButtonStyled
              disabled={!attendancesComplete}
              onClick={() => {
                history.push(`${match.path}/complement`);
              }}
            >
              SALVAR
            </CustomButtonStyled>
          </ButtonContainerStyled>
        </MainContainer>
      )
  );
};

export default AttendancePage;
