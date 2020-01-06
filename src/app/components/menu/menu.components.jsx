import React from 'react';
import MenuItem from '../menu-item/menu-item.components';
import { StyledList } from './menu.styles';
import attendance from '../../../assets/attendance.png';

const Menu = () => (
  <div>
    <nav>
      <StyledList>
        <li><MenuItem icon={attendance} text="Lista de Presença" /></li>
      </StyledList>
    </nav>
  </div>
);

export default Menu;
