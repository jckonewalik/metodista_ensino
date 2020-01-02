import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormInput from '../../components/form-input/form-input.component';
import api from '../../../services/api';
import {
  MainContainerStyled,
  ImageContainerStyled, ImageStyled, CustomButtonStyled, OptionStyled,
} from './sign-in.styles';
import metodista from '../../../assets/metodista.png';

const SignInPage = () => {
  const [currentError, setCurrentError] = useState({
    hasError: false,
    errorMessage: '',
  });
  const [userCredentials, setUserCredentials] = useState(
    {
      email: '',
      password: '',
    },
  );
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/sessions',
        { email: userCredentials.email, password: userCredentials.password });
      const { user } = await response.data;
      setCurrentError({ hasError: false, errorMessage: '' });
    } catch (error) {
      const { message } = error.response.data;
      setCurrentError({ hasError: true, errorMessage: message });
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
      <OptionStyled href="/#">Esqueceu a senha?</OptionStyled>
      <Dialog
        open={currentError.hasError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Erro ao efetuar login</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {currentError.errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButtonStyled onClick={() => setCurrentError({ hasError: false, errorMessage: '' })}>Ok</CustomButtonStyled>
        </DialogActions>
      </Dialog>
    </MainContainerStyled>
  );
};

export default SignInPage;
