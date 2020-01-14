import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  IconButton,
  TableContainer, Paper, Table, TableRow, TableCell, TableBody,
  Snackbar,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { currentCourseLessonsSelector } from '../../../redux/course/course.selectors';
import { setCourseLessons } from '../../../redux/course/course.actions';
import { MainContainer, TableContainerStyled } from './lesson-form.styles';
import ConfirmDialog from '../confirm-dialog/confirm-dialog.component';
import Alert from '../alert/alert.component';
import * as service from '../../../services/lessons/lessons.services';

const LessonForm = () => {
  const INITIAL_STATE = {
    number: '',
    name: '',
  };
  const dispatch = useDispatch();
  const [lesson, setLesson] = useState(INITIAL_STATE);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [currentError, setCurrentError] = useState({ hasError: false, message: '' });
  const lessons = useSelector(currentCourseLessonsSelector);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setLesson({ ...lesson, [name]: value });
  };
  const handleAddLesson = () => {
    if (!lesson.number || lesson.number === 0) {
      setCurrentError({ hasError: true, message: 'Informe o número da lição' });
      return;
    }
    if (!lesson.name || lesson.name === '') {
      setCurrentError({ hasError: true, message: 'Informe o nome da lição' });
      return;
    }
    const exists = lessons.filter((l) => Number(l.number) === Number(lesson.number));
    if (exists.length) {
      setCurrentError({ hasError: true, message: 'Já existe uma lição com esse número' });
      return;
    }
    const newLessons = lessons;
    newLessons.push(lesson);
    dispatch(setCourseLessons(newLessons));
    setLesson(INITIAL_STATE);
  };
  const handleErrorClose = () => {
    setCurrentError({ hasError: false, message: '' });
  };
  const handleDeleteLesson = (deletedLesson) => {
    setLesson(deletedLesson);
    setOpenConfirmation(true);
  };

  const deleteLesson = async () => {
    setOpenConfirmation(false);
    try {
      if (lesson.id) {
        await service.deleteLesson({ lesson });
      }
      const newLessons = lessons.filter((l) => l.number !== lesson.number);
      dispatch(setCourseLessons(newLessons));
    } catch (err) {
      const { data } = await err.response;
      if (data) {
        setCurrentError({ hasError: true, message: data.message });
      }
    }
  };

  return (
    <MainContainer>
      <FormInput
        label="Número"
        name="number"
        value={lesson.number}
        handleChange={handleInputChange}
        type="number"
      />
      <FormInput
        flex
        label="Nome"
        name="name"
        value={lesson.name}
        handleChange={handleInputChange}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CustomButton
          style={{ width: '120px', height: '30px' }}
          onClick={() => { handleAddLesson(lesson); }}
        >
  Adicionar
        </CustomButton>
      </div>
      <TableContainerStyled>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {lessons.map((l) => (
                <TableRow key={l.number}>
                  <TableCell component="th" scope="row">
                    {l.number}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {l.name}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleDeleteLesson(l)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TableContainerStyled>
      <Snackbar
        open={currentError.hasError}
        autoHideDuration={6000}
        onClose={handleErrorClose}
      >
        <Alert severity="error">{currentError.message}</Alert>
      </Snackbar>
      <ConfirmDialog
        open={openConfirmation}
        message="Confirma a exclusão do Lição?"
        handleNo={() => setOpenConfirmation(false)}
        handleYes={deleteLesson}
      />
    </MainContainer>
  );
};
export default LessonForm;
