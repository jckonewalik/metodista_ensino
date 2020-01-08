import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { toggleMenu } from '../../../redux/menu/menu.actions';
import { toggledMenuSelector } from '../../../redux/menu/menu.selectors';
import { headerTitleSelector, headerSubtitleSelector } from '../../../redux/header/header.selectors';
import { logoutUser } from '../../../redux/user/user.actions';
import {
  MainContainer, IconWhite, TitleContainer, TitleStyled, SubtitleStyled,
} from './header.styles';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const menuToggled = useSelector(toggledMenuSelector);
  const title = useSelector(headerTitleSelector);
  const subtitle = useSelector(headerSubtitleSelector);

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const handleMenuClick = () => {
    dispatch(toggleMenu());
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
      <TitleContainer>
        <TitleStyled>{title}</TitleStyled>
        <SubtitleStyled>{subtitle}</SubtitleStyled>
      </TitleContainer>
      <IconButton onClick={handleClick}>
        <IconWhite>person</IconWhite>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </MainContainer>
  );
};

export default Header;
