import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  AppBar, Toolbar, Button,
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
import * as service from '../../../services/students/students.services';
import Spinner from '../../components/spinner/spinner.component';


let typingTimer;
let titleForm = '';

const INITIAL_DATA = {
  id: undefined,
  firstName: '',
  lastName: '',
  birthDate: null,
  gender: 'male',
  phoneNumber: '',
};

class StudentsPage extends Component {
  constructor() {
    super();
    this.state = {
      nameSearch: '',
      students: [],
      openForm: false,
      currentStudent: INITIAL_DATA,
      currentError: { hasError: false, message: '' },
      openConfirmation: false,
      hasMoreData: false,
      currentPage: 0,
    };
  }

  componentDidMount() {
    const { updateHeaderTitle } = this.props;
    updateHeaderTitle({ title: 'Alunos', subtitle: 'Metodista Ensino' });
  }

  fetchMoreData = async () => {
    const { nameSearch, students, currentPage } = this.state;
    const fetched = await service.listStudents(
      {
        name: nameSearch,
        page: currentPage,
        pageSize: 10,
      },
    );
    if (fetched) {
      this.setState({
        students: students.concat(fetched.students),
        currentPage: currentPage + 1,
        hasMoreData: true,
      });
    } else {
      this.setState({
        currentError: { hasError: !students.length, message: 'Nenhum aluno encontrado' },
        currentPage: currentPage + 1,
        hasMoreData: false,
      });
    }
  }

  handleInputChange = ({ target }) => {
    const { currentStudent } = this.state;
    const { name, value } = target;
    this.setState({
      currentStudent: { ...currentStudent, [name]: value },
    });
  };

  handleDateChange = (date) => {
    const { currentStudent } = this.state;
    this.setState({
      currentStudent: { ...currentStudent, birthDate: date },
    });
  };

  handleAddStudent = () => {
    titleForm = 'Adicionar Aluno';
    this.setState({ currentStudent: INITIAL_DATA, openForm: true });
  };

  handleEditStudent = async (student) => {
    titleForm = 'Editar Curso';
    this.setState({ currentStudent: student, openForm: true });
  };

  handleDeleteCourse = (student) => {
    this.setState({
      currentStudent: student,
      openConfirmation: true,
    });
  };

  deleteStudent = async () => {
    const { currentStudent, students } = this.state;
    try {
      await service.deleteStudent({ student: currentStudent });
      this.setState(
        {
          openConfirmation: false,
          students: students.filter((s) => s.id !== currentStudent.id),
          currentStudent: INITIAL_DATA,
        },
      );
    } catch (err) {
      const { data } = await err.response;
      if (data) {
        this.setState({
          openConfirmation: false,
          currentError: { hasError: true, message: data.message },
        });
      }
    }
  };

  handleSaveStudent = async () => {
    const { currentStudent } = this.state;
    if (!currentStudent.firstName || currentStudent.firstName === '') {
      this.setState({ currentError: { hasError: true, message: 'Informe o nome do aluno' } });
      return;
    }
    if (!currentStudent.lastName || currentStudent.lastName === '') {
      this.setState({ currentError: { hasError: true, message: 'Informe o sobrenome do aluno' } });
      return;
    }
    if (currentStudent.birthDate > new Date()) {
      this.setState({ currentError: { hasError: true, message: 'A data de nascimento não pode ser maior que a data atual' } });
      return;
    }
    try {
      await service.saveStudent({ student: currentStudent });
      this.searchStudent();
      this.setState({
        openForm: false,
        currentStudent: INITIAL_DATA,
      });
    } catch (err) {
      this.setState({
        currentError: { hasError: true, message: err.message },
      });
    }
  };

  handleCloseForm = () => {
    this.setState({ openForm: false });
  };

  handleErrorClose = () => {
    this.setState({ currentError: { hasError: false, message: '' } });
  };

  searchStudent = () => {
    const { nameSearch } = this.state;
    this.setState({ students: [], currentPage: 0 }, () => {
      if (nameSearch.length >= 3) {
        this.fetchMoreData();
      }
    });
  };

  handleSearchStudentInput = ({ target }) => {
    clearTimeout(typingTimer);
    this.setState({ nameSearch: target.value }, () => {
      typingTimer = setTimeout(this.searchStudent, 1000);
    });
  };

  render() {
    const {
      currentError,
      openConfirmation,
      currentStudent,
      nameSearch,
      students,
      hasMoreData,
      openForm,
    } = this.state;
    return (
      <>
        <FormStyled>
          <FormInput
            label="Nome do Aluno"
            value={nameSearch}
            handleChange={this.handleSearchStudentInput}
          />
        </FormStyled>
        <BodyContainer>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.fetchMoreData}
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
                  <IconButton onClick={() => this.handleEditStudent(s)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => this.handleDeleteCourse(s)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </StudentItemStyled>
            ))}
          </InfiniteScroll>
        </BodyContainer>
        <FooterContent>
          <Fab color="primary" aria-label="add" onClick={this.handleAddStudent}>
            <AddIcon />
          </Fab>
        </FooterContent>
        <Dialog
          fullScreen
          open={openForm}
          onClose={() => this.setState({ openForm: false })}
        >
          <AppBar>
            <Toolbar>
              <IconButton onClick={this.handleCloseForm}>
                <CloseIcon style={{ color: '#fff' }} />
              </IconButton>
              <TitleStyled variant="h6">{titleForm}</TitleStyled>
              <Button style={{ color: '#fff' }} onClick={this.handleSaveStudent}>Salvar</Button>
            </Toolbar>
          </AppBar>
          <DialogTitle>{titleForm}</DialogTitle>
          <DialogContent>
            <FormStyled>
              <FormInput
                label="Nome"
                name="firstName"
                required
                value={currentStudent.firstName}
                handleChange={this.handleInputChange}
              />
              <FormInput
                label="Sobrenome"
                name="lastName"
                required
                value={currentStudent.lastName}
                handleChange={this.handleInputChange}
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
                  onChange={this.handleDateChange}
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
                onChange={this.handleInputChange}
              >
                <FormControlLabel labelPlacement="end" value="female" control={<Radio />} label="Feminino" />
                <FormControlLabel labelPlacement="end" value="male" control={<Radio />} label="Masculino" />
              </RadioGroup>
              <FormInput
                label="Telefone"
                name="phoneNumber"
                value={currentStudent.phoneNumber}
                handleChange={this.handleInputChange}
              />
            </FormStyled>
          </DialogContent>
        </Dialog>
        <Snackbar
          open={currentError.hasError}
          autoHideDuration={6000}
          onClose={this.handleErrorClose}
        >
          <Alert severity="error">{currentError.message}</Alert>
        </Snackbar>
        <ConfirmDialog
          open={openConfirmation}
          message="Confirma a exclusão do aluno?"
          handleNo={() => this.setState({ openConfirmation: false })}
          handleYes={this.deleteStudent}
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateHeaderTitle: (title) => dispatch(setHeaderTitle(title)),
});

export default connect(null, mapDispatchToProps)(StudentsPage);
