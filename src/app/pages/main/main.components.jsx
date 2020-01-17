import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Header from '../../components/header/header.component';
import {
  RootContainer, MainContent, MenuContainerStyled, ContentStyled,
} from './main.styles';
import Menu from '../../components/menu/menu.component';
import { toggledMenuSelector } from '../../../redux/menu/menu.selectors';
import { isAdminUserSelector } from '../../../redux/user/user.selectors';
import MyClassesPage from '../my-classes/my-classes.component';
import AttendancePage from '../attendance/attendance.component';
import AttendanceComplementPage from '../attendance-complement/attendance-complement.component';
import CoursesPage from '../courses/courses.component';
import StudentsPage from '../students/students.component';

const PrivateAdminRoute = ({ component: Component, isAdmin, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      isAdmin ? <Component {...props} />
        : <Redirect to="/" />
    )}
  />
);

const MainPage = () => {
  const toggled = useSelector(toggledMenuSelector);
  const isAdminUser = useSelector(isAdminUserSelector);
  return (
    <BrowserRouter>
      <RootContainer>
        <Header />
        <MainContent>
          <MenuContainerStyled toggled={toggled}>
            <Menu />
          </MenuContainerStyled>
          <ContentStyled>
            <Route exact path="/attendance/my-classes" component={MyClassesPage} />
            <Route exact path="/attendance/my-classes/attendance-list" component={AttendancePage} />
            <Route exact path="/attendance/my-classes/attendance-list/complement" component={AttendanceComplementPage} />
            <PrivateAdminRoute isAdmin={isAdminUser} exact path="/courses" component={CoursesPage} />
            <Route exact path="/students" component={StudentsPage} />
          </ContentStyled>
        </MainContent>
      </RootContainer>
    </BrowserRouter>
  );
};

export default MainPage;
