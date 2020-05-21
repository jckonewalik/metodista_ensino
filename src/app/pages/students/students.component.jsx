import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  AppBar, Toolbar, Button,
  Tabs, Tab,
  RadioGroup, Radio, FormLabel,
  Fab, Dialog, DialogContent, DialogTitle, IconButton, Snackbar,
  FormControlLabel,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import { setHeaderTitle } from '../../../redux/header/header.actions';
import ConfirmDialog from '../../components/confirm-dialog/confirm-dialog.component';
import Alert from '../../components/alert/alert.component';
import FormInput from '../../components/form-input/form-input.component';
import {
  FooterContent, BodyContainer, TitleStyled, FormStyled, StudentItemStyled,
} from './students.styles';
import * as service from '../../../services/students.services';
import Spinner from '../../components/spinner/spinner.component';
import TabPanel from '../../components/tab-panel/tab-panel.component';


let typingTimer;
let titleForm = '';
let currentPage;
let hasMoreData = false;


const INITIAL_DATA = {
  id: undefined,
  firstName: '',
  lastName: '',
  birthDate: null,
  gender: 'male',
  phoneNumber: '',
};

const StudentsPage = () => {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const [nameSearch, setNameSearch] = useState('');
  const [students, setStudents] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(INITIAL_DATA);
  const [currentError, setCurrentError] = useState({ hasError: false, message: '' });
  const [openConfirmation, setOpenConfirmation] = useState(false);

  useEffect(() => {
    dispatch(setHeaderTitle({ title: 'Alunos', subtitle: 'Metodista Ensino' }));
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setActiveIndex(newValue);
  };

  const fetchMoreData = async (newsearch = false) => {
    const pageSize = 10;
    const fetched = await service.list(
      {
        name: nameSearch,
        page: currentPage,
        pageSize,
      },
    );
    if (fetched) {
      if (newsearch) {
        setStudents(fetched.students);
      } else {
        setStudents(students.concat(fetched.students));
      }
      currentPage += 1;
      hasMoreData = !(fetched.students.length < pageSize);
    } else {
      setCurrentError({ hasError: !students.length, message: 'Nenhum aluno encontrado' });
      currentPage += 1;
      hasMoreData = false;
    }
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setCurrentStudent({ ...currentStudent, [name]: value });
  };

  const handleDateChange = (date) => {
    setCurrentStudent({ ...currentStudent, birthDate: date });
  };

  const handleAddStudent = () => {
    titleForm = 'Adicionar Aluno';
    setCurrentStudent(INITIAL_DATA);
    setOpenForm(true);
  };

  const handleEditStudent = async (student) => {
    titleForm = 'Editar Aluno';
    setCurrentStudent(student);
    setOpenForm(true);
  };

  const handleDeleteCourse = (student) => {
    setCurrentStudent(student);
    setOpenConfirmation(true);
  };

  const deleteStudent = async () => {
    try {
      await service.remove({ student: currentStudent });
      setOpenConfirmation(false);
      setStudents(students.filter((s) => s.id !== currentStudent.id));
      setCurrentStudent(INITIAL_DATA);
    } catch (err) {
      const { data } = await err.response;
      if (data) {
        setOpenConfirmation(false);
        setCurrentError({ hasError: true, message: data.message });
      }
    }
  };

  const searchStudent = async () => {
    if (nameSearch.length >= 3) {
      currentPage = 0;
      await fetchMoreData(true);
    }
  };

  const handleSaveStudent = async () => {
    if (!currentStudent.firstName || currentStudent.firstName === '') {
      setCurrentError({ hasError: true, message: 'Informe o nome do aluno' });
      return;
    }
    if (!currentStudent.lastName || currentStudent.lastName === '') {
      setCurrentError({ hasError: true, message: 'Informe o sobrenome do aluno' });
      return;
    }
    if (currentStudent.birthDate > new Date()) {
      setCurrentError({ hasError: true, message: 'A data de nascimento não pode ser maior que a data atual' });
      return;
    }
    try {
      await service.save({ student: currentStudent });
      searchStudent();
      setOpenForm(false);
      setCurrentStudent(INITIAL_DATA);
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

  const handleSearchStudentInput = ({ target }) => {
    hasMoreData = false;
    clearTimeout(typingTimer);
    setNameSearch(target.value);
  };

  useEffect(() => {
    typingTimer = setTimeout(searchStudent, 1000);
  }, [nameSearch]);

  return (
    <>
      <FormStyled>
        <FormInput
          label="Nome do Aluno"
          value={nameSearch}
          handleChange={handleSearchStudentInput}
        />
      </FormStyled>
      <BodyContainer>
        <InfiniteScroll
          pageStart={0}
          loadMore={fetchMoreData}
          hasMore={hasMoreData}
          loader={<Spinner key={0} />}
          useWindow={false}
        >
          {students.map((s) => (
            <StudentItemStyled key={s.id}>
              <div style={{ flex: 1 }}>
                {s.firstName}
                {' '}
                {s.lastName}
              </div>
              <div>
                <IconButton onClick={() => handleEditStudent(s)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteCourse(s)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </StudentItemStyled>
          ))}
        </InfiniteScroll>
      </BodyContainer>
      <FooterContent>
        <Fab color="primary" aria-label="add" onClick={handleAddStudent}>
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
            <Button style={{ color: '#fff' }} onClick={handleSaveStudent}>Salvar</Button>
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
            <Tab label="Aluno" />
            <Tab label="Turmas" />
          </Tabs>
          <TabPanel value={activeIndex} index={0}>
            <FormStyled>
              <FormInput
                label="Nome"
                name="firstName"
                required
                value={currentStudent.firstName}
                handleChange={handleInputChange}
              />
              <FormInput
                label="Sobrenome"
                name="lastName"
                required
                value={currentStudent.lastName}
                handleChange={handleInputChange}
              />
              <MuiPickersUtilsProvider
                style={{ width: '100%', marginTop: '30px' }}
                utils={DateFnsUtils}
              >
                <KeyboardDatePicker
                  style={{ width: '100%', marginTop: '0' }}
                  margin="normal"
                  id="birth-date-picker"
                  label="Data Nascimento"
                  format="dd/MM/yyyy"
                  value={currentStudent.birthDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <FormLabel
                style={{ marginTop: '30px' }}
                component="legend"
              >
                Sexo
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                row
                value={currentStudent.gender}
                onChange={handleInputChange}
              >
                <FormControlLabel labelPlacement="end" value="female" control={<Radio />} label="Feminino" />
                <FormControlLabel labelPlacement="end" value="male" control={<Radio />} label="Masculino" />
              </RadioGroup>
              <FormInput
                label="Telefone"
                name="phoneNumber"
                value={currentStudent.phoneNumber || ''}
                handleChange={handleInputChange}
              />
            </FormStyled>
          </TabPanel>
          <TabPanel value={activeIndex} index={1}>
            <span>Hello</span>
          </TabPanel>

        </DialogContent>
      </Dialog>
      <Snackbar
        open={currentError.hasError}
        autoHideDuration={6000}
        onClose={handleErrorClose}
      >
        <Alert severity="error">{currentError.message}</Alert>
      </Snackbar>
      <ConfirmDialog
        open={openConfirmation}
        message="Confirma a exclusão do aluno?"
        handleNo={() => setOpenConfirmation(false)}
        handleYes={deleteStudent}
      />
    </>
  );
};


export default StudentsPage;
