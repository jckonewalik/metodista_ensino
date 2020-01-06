import React from 'react';
import {
  MenuItemStyled, MenuItemContainer, ImageStyled, TextStyled,
} from './menu-item.styles';
import { ReactComponent as Arrow } from '../../../assets/arrow_right.svg';

const MenuItem = ({ handleClick, icon, text }) => (
  <MenuItemStyled onClick={handleClick} type="button">
    <MenuItemContainer>
      <ImageStyled src={icon} alt={text} />
      <TextStyled>{text}</TextStyled>
    </MenuItemContainer>
    <Arrow />
  </MenuItemStyled>
);

export default MenuItem;
