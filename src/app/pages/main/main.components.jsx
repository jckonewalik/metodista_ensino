import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from '../../components/header/header.component';
import {
  RootContainer, MainContent, MenuContainerStyled, ContentStyled,
} from './main.styles';
import Menu from '../../components/menu/menu.component';
import { toggledMenuSelector } from '../../../redux/menu/menu.selectors';
import MyClassesPage from '../my-classes/my-classes.component';
import AttendancePage from '../attendance/attendance.component';
import AttendanceComplementPage from '../attendance-complement/attendance-complement.component';

const MainPage = () => {
  const toggled = useSelector(toggledMenuSelector);
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
          </ContentStyled>
        </MainContent>
      </RootContainer>
    </BrowserRouter>
  );
};

export default MainPage;
