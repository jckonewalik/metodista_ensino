import React from 'react';
import { Menu, Person } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { MainContainer } from './header.styles';

const Header = () => (
  <MainContainer>
    <IconButton>
      <Menu style={{ color: '#fff' }} />
    </IconButton>
    <IconButton>
      <Person style={{ color: '#fff' }} />
    </IconButton>
  </MainContainer>
);

export default Header;
