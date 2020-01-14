import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar, Toolbar, Button,
  Tabs, Tab,
  Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  Fab, Dialog, DialogContent, DialogTitle, IconButton, Snackbar,
  FormControlLabel, Switch,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import { currentCourseSelector } from '../../../redux/course/course.selectors';
import { setCurrentCourse } from '../../../redux/course/course.actions';
import { setHeaderTitle } from '../../../redux/header/header.actions';
import ConfirmDialog from '../../components/confirm-dialog/confirm-dialog.component';
import Alert from '../../components/alert/alert.component';
import TabPanel from '../../components/tab-panel/tab-panel.component';
import FormInput from '../../components/form-input/form-input.component';
import LessonForm from '../../components/lesson-form/lesson-form.component';
import {
  FooterContent, BodyContainer, TitleStyled, FormStyled,
} from './courses.styles';
import * as service from '../../../services/courses/courses.services';
import { sortArray } from '../../utils/utils';

const CoursesPage = () => {
  const INITIAL_DATA = {
    id: undefined,
    name: '',
    active: true,
    lessons: [],
  };
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [titleForm, setTitleForm] = useState('');
  const [courseList, setCourseList] = useState([]);
  const currentCourse = useSelector(currentCourseSelector);
  const [currentError, setCurrentError] = useState({ hasError: false, message: '' });
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const loadCourses = async () => {
    try {
      let myCourses = await service.getCourses();
      myCourses = sortArray({ array: myCourses, attr: 'name', order: 'asc' });
      setCourseList(myCourses);
    } catch {
      setCourseList([]);
    }
  };

  useEffect(() => {
    dispatch(setHeaderTitle({ title: 'Cursos', subtitle: 'Metodista Ensino' }));
    loadCourses();
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setActiveIndex(newValue);
  };
  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    dispatch(setCurrentCourse({ ...currentCourse, [name]: value }));
  };
  const handleSwitchChange = ({ target }) => {
    const { name } = target;
    dispatch(setCurrentCourse({ ...currentCourse, [name]: !currentCourse[name] }));
  };

  const handleAddCourse = () => {
    dispatch(setCurrentCourse(INITIAL_DATA));
    setTitleForm('Adicionar Curso');
    setOpenForm(true);
  };
  const handleEditCourse = async ({ id }) => {
    try {
      const response = await service.getCourse({ id });
      dispatch(setCurrentCourse(response));
      setTitleForm('Editar Curso');
      setOpenForm(true);
    } catch (error) {
      setCurrentError({ hasError: true, message: error.message });
    }
  };
  const handleDeleteCourse = (value) => {
    dispatch(setCurrentCourse(value));
    setOpenConfirmation(true);
  };

  const deleteCourse = async () => {
    setOpenConfirmation(false);
    try {
      await service.deleteCourse({ course: currentCourse });
      loadCourses();
    } catch (err) {
      const { data } = await err.response;
      if (data) {
        setCurrentError({ hasError: true, message: data.message });
      }
    }
  };

  const handleSaveCourse = async () => {
    if (!currentCourse.name || currentCourse.name === '') {
      setCurrentError({ hasError: true, message: 'Informe o nome do curso' });
      return;
    }
    try {
      await service.saveCourse({ course: currentCourse });
      loadCourses();
      setOpenForm(false);
    } catch (err) {
      setCurrentError({ hasError: true, message: err.message });
    }
  };
  const handleCloseForm = () => {
    setOpenForm(false);
  };
  const handleErrorClose = () => {
    setCurrentError({ hasError: false, message: '' });
  };
  return (
    <>
      <BodyContainer>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 700 }}>Nome</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {courseList.map((c) => (
                <TableRow key={c.id}>
                  <TableCell component="th" scope="row">
                    {c.name}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEditCourse(c)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteCourse(c)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </BodyContainer>
      <FooterContent>
        <Fab color="primary" aria-label="add" onClick={handleAddCourse}>
          <AddIcon />
        </Fab>
      </FooterContent>
      <Dialog
        fullScreen
        open={openForm}
        onClose={() => setOpenForm(false)}
      >
        <AppBar>
          <Toolbar>
            <IconButton onClick={handleCloseForm}>
              <CloseIcon style={{ color: '#fff' }} />
            </IconButton>
            <TitleStyled variant="h6">{titleForm}</TitleStyled>
            <Button style={{ color: '#fff' }} onClick={handleSaveCourse}>Salvar</Button>
          </Toolbar>
        </AppBar>
        <DialogTitle>{titleForm}</DialogTitle>
        <DialogContent>
          <Tabs
            value={activeIndex}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            centered
          >
            <Tab label="Curso" />
            <Tab label="Lições" />
          </Tabs>
          <TabPanel value={activeIndex} index={0}>
            <FormStyled>
              <FormInput
                label="Nome"
                name="name"
                required
                value={currentCourse.name}
                handleChange={handleInputChange}
              />
              <FormControlLabel
                control={(
                  <Switch
                    name="active"
                    checked={currentCourse.active}
                    value={currentCourse.active}
                    onChange={handleSwitchChange}
                  />
                )}
                label={currentCourse.active ? 'Ativo' : 'Inativo'}
              />
            </FormStyled>
          </TabPanel>
          <TabPanel value={activeIndex} index={1}>
            <LessonForm />
          </TabPanel>
        </DialogContent>
      </Dialog>
      <Snackbar open={currentError.hasError} autoHideDuration={6000} onClose={handleErrorClose}>
        <Alert severity="error">{currentError.message}</Alert>
      </Snackbar>
      <ConfirmDialog
        open={openConfirmation}
        message="Confirma a exclusão do Curso?"
        handleNo={() => setOpenConfirmation(false)}
        handleYes={deleteCourse}
      />
    </>
  );
};

export default CoursesPage;
