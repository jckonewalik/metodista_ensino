import React from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleMenu } from '../../../redux/menu/menu.actions';
import MenuItem from '../menu-item/menu-item.component';
import { StyledList } from './menu.styles';
import attendance from '../../../assets/attendance.png';

const Menu = ({ history }) => {
  const dispatch = useDispatch();
  const closeMenu = () => {
    dispatch(toggleMenu());
  };
  const handleAttendanceClick = () => {
    history.push('/attendance/my-classes');
    closeMenu();
  };
  return (
    <div>
      <nav>
        <StyledList>
          <li>
            <MenuItem
              handleClick={handleAttendanceClick}
              icon={attendance}
              text="Lista de Presença"
            />
          </li>
        </StyledList>
      </nav>
    </div>
  );
};
export default withRouter(Menu);
