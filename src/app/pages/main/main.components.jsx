import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/header/header.components';
import {
  RootContainer, MainContent, MenuContainerStyled, ContentStyled,
} from './main.styles';
import Menu from '../../components/menu/menu.components';
import { toggledMenuSelector } from '../../../redux/menu/menu.selectors';

const MainPage = () => {
  const toggled = useSelector(toggledMenuSelector);
  return (
    <RootContainer>
      <Header />
      <MainContent>
        <MenuContainerStyled toggled={toggled}>
          <Menu />
        </MenuContainerStyled>
        <ContentStyled />

      </MainContent>
    </RootContainer>
  );
};

export default MainPage;
