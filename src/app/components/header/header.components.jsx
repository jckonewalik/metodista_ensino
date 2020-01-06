import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { toggleMenu } from '../../../redux/menu/menu.actions';
import { toggledMenuSelector } from '../../../redux/menu/menu.selectors';
import { MainContainer, IconWhite } from './header.styles';

const Header = () => {
  const dispatch = useDispatch();
  const menuToggled = useSelector(toggledMenuSelector);

  const handleMenuClick = () => {
    dispatch(toggleMenu());
  };

  return (
    <MainContainer>
      {
        !menuToggled
          ? (
            <IconButton onClick={handleMenuClick}>
              <IconWhite>menu</IconWhite>
            </IconButton>
          )
          : (
            <IconButton onClick={handleMenuClick}>
              <IconWhite>close</IconWhite>
            </IconButton>
          )
      }
      <IconButton>
        <IconWhite>person</IconWhite>
      </IconButton>
    </MainContainer>
  );
};

export default Header;
