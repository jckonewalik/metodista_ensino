import React from 'react';
import { useSelector } from 'react-redux';
import {
  ContainerStyled,
} from './attendance-list.styles';
import AttendanceItem from '../attendance-item/attendance-item.component';
import { selectAttendanceAppointments } from '../../../redux/attendance/attendance.selectors';

const AttendanceList = () => {
  const appointments = useSelector(selectAttendanceAppointments);
  return (
    <ContainerStyled>
      {
        appointments.map((item) => <AttendanceItem key={item.student.id} appointment={item} />)
      }
    </ContainerStyled>
  );
};

export default AttendanceList;
