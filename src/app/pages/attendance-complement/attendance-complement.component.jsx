import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleErrorMessage } from '../../utils/utils';
import api from '../../../services/api';
import {
  setAttendanceTeacher,
  setAttendanceLesson,
  saveAttendanceSuccess,
  fetchLessonsListStart,
} from '../../../redux/attendance/attendance.actions';
import {
  RootContainerStyled,
  BodyStyled,
  FooterStyled,
  ButtonStyled,
} from './attendance-complement.styles';
import {
  selectAttendanceTeacher,
  selectAttendanceLesson,
  selectAttendanceLessons,
  selectCurrentAttendance,
} from '../../../redux/attendance/attendance.selectors';
import { selectCurrentClass, 
  selectIsFechingCurrentClass, 
  selectTeachersCurrentClass 
} from '../../../redux/students-class/students-class.selectors';
import { CustomInfoDialog } from '../../components/custom-dialog/custom-dialog.component';
import CustomPickerButton from '../../components/custom-picker-button/custom-picker-button.component';

const AttendanceComplementPage = ({ history }) => {
  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachersCurrentClass);
  const lessons = useSelector(selectAttendanceLessons);
  const attendanceTeacher = useSelector(selectAttendanceTeacher);
  const attendanceLesson = useSelector(selectAttendanceLesson);
  const attendance = useSelector(selectCurrentAttendance);
  const studentsClass = useSelector(selectCurrentClass);
  const isFetchingCurrentClass = useSelector(selectIsFechingCurrentClass);
  
  const [message, setMessage] = useState({ title: '', message: '', isError: false });
  const [open, setOpen] = useState(false);

  const handleOkClick = () => {
    if (message.isError) {
      setOpen(false);
    } else {
      history.push('/attendance/my-classes');
    }
  };

  const handleTeacherChange = (itemValue) => {
    dispatch(setAttendanceTeacher(itemValue));
  };
  const handleLessonChange = (itemValue) => {
    dispatch(setAttendanceLesson(itemValue));
  };
  const handleSaveButton = async () => {
    try {
      const body = {
        date: attendance.date,
        StudentsClassId: studentsClass.id,
        TeacherId: attendance.teacher && attendance.teacher.id,
        LessonId: attendance.lesson && attendance.lesson.id,
        appointments: attendance.appointments.map(
          (appointment) => ({ StudentId: appointment.student.id, status: appointment.status }),
        ),
      };
      await api.post('/attendances', body);
      await dispatch(saveAttendanceSuccess());
      setMessage({ title: '', message: 'Chamada realizada com sucesso', isError: false });
      setOpen(true);
    } catch (error) {
      const errorMessage = await handleErrorMessage(error);
      setMessage({
        title: 'Erro ao realizar chamada',
        message: errorMessage,
        isError: true,
      });
      setOpen(true);
    }
  };

  useEffect(() => { dispatch(fetchLessonsListStart()); }, [dispatch]);

  return (
    !studentsClass && !isFetchingCurrentClass ? <Redirect to="/attendance/my-classes" />
      : (
        <>
          <RootContainerStyled>
            <BodyStyled>
              <CustomPickerButton
                label="Professor"
                value={attendanceTeacher}
                handleChange={handleTeacherChange}
                options={teachers.map((teacher) => ({ id: teacher.id, name: `${teacher.firstName}` }))}
              />
              { lessons.length > 0
                ? (
                  <CustomPickerButton
                    label="Lição"
                    value={attendanceLesson}
                    handleChange={handleLessonChange}
                    options={lessons.map((lesson) => ({ id: lesson.id, name: `${lesson.name}` }))}
                  />
                )
                : null}
            </BodyStyled>
            <FooterStyled>
              <ButtonStyled onClick={() => history.goBack()}>VOLTAR</ButtonStyled>
              <ButtonStyled onClick={handleSaveButton}>SALVAR</ButtonStyled>
            </FooterStyled>
          </RootContainerStyled>
          <CustomInfoDialog
            open={open}
            handleOkClick={handleOkClick}
            title={message.title}
            message={message.message}
          />
        </>
      ));
};

export default AttendanceComplementPage;
