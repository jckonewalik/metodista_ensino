import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { setCurrentUser } from '../../../redux/user/user.actions';
import FormInput from '../../components/form-input/form-input.component';
import api from '../../../services/api';
import {
  MainContainerStyled,
  ImageContainerStyled, ImageStyled, CustomButtonStyled, OptionStyled,
} from './sign-in.styles';
import metodista from '../../../assets/metodista.png';

const SignInPage = () => {
  const dispatch = useDispatch();
  const [currentAlert, setCurrentAlert] = useState({
    open: false,
    title: '',
    message: '',
  });
  const [userCredentials, setUserCredentials] = useState(
    {
      email: '',
      password: '',
    },
  );
  const handleForgotPassword = async () => {
    try {
      await api.put('/users/reset-password', { email: userCredentials.email });
      setCurrentAlert({ open: true, title: 'Reset e senha', message: `Um E-mail foi enviado para o endereço ${userCredentials.email}` });
    } catch (error) {
      const { data: { message } } = await error.response;
      setCurrentAlert({
        open: true,
        title: 'Erro ao efetuar reset e senha',
        message: message || 'Request Error',
      });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/sessions',
        { email: userCredentials.email, password: userCredentials.password });
      const { user } = await response.data;
      setCurrentAlert({ open: false, title: '', message: '' });
      dispatch(setCurrentUser(user));
    } catch (error) {
      const { data: { message } } = error.response;
      setCurrentAlert({
        open: true,
        title: 'Erro ao efetuar Login',
        message: message || 'Request Error',
      });
    }
  };
  const handleChange = ({ target: { name, value } }) => {
    setUserCredentials({ ...userCredentials, [name]: value });
  };
  return (
    <MainContainerStyled>
      <ImageContainerStyled>
        <ImageStyled src={metodista} alt="metodista" />
      </ImageContainerStyled>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="E-mail"
          type="input"
          name="email"
          value={userCredentials.email}
          handleChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={userCredentials.password}
          handleChange={handleChange}
        />
        <CustomButtonStyled type="submit">Login</CustomButtonStyled>
      </form>
      <OptionStyled onClick={handleForgotPassword} href="/#">Esqueceu a senha?</OptionStyled>
      <Dialog
        open={currentAlert.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{currentAlert.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {currentAlert.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButtonStyled onClick={() => setCurrentAlert({ open: false, title: '', message: '' })}>Ok</CustomButtonStyled>
        </DialogActions>
      </Dialog>
    </MainContainerStyled>
  );
};

export default SignInPage;
