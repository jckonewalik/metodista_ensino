import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { currentUserSelector } from '../redux/user/user.selectors';
import SignInPage from './pages/sign-in/sign-in.component';
import MainPage from './pages/main/main.components';
import { checkUserSessionStart } from '../redux/user/user.actions';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSessionStart());
  }, [dispatch]);
  const currentUser = useSelector(currentUserSelector);
  return !currentUser
    ? <SignInPage /> : <MainPage />;
};

export default App;
