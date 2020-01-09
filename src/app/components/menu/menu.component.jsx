import React from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleMenu } from '../../../redux/menu/menu.actions';
import MenuItem from '../menu-item/menu-item.component';
import { StyledList } from './menu.styles';
import attendance from '../../../assets/attendance.png';
import teachers from '../../../assets/teachers.png';
import books from '../../../assets/books.png';
import student from '../../../assets/student.png';
import desk from '../../../assets/desk.png';


const Menu = ({ history }) => {
  const dispatch = useDispatch();
  const closeMenu = () => {
    dispatch(toggleMenu());
  };
  const handleAttendanceClick = () => {
    history.push('/attendance/my-classes');
    closeMenu();
  };
  const handleTeachersClick = () => {

  };
  const handleCoursesClick = () => {
    history.push('/courses');
    closeMenu();
  };
  const handleStudentsClick = () => {

  };
  const handleStudentsClassClick = () => {

  };
  return (
    <div>
      <nav>
        <StyledList>
          <li>
            <MenuItem
              handleClick={handleStudentsClick}
              icon={student}
              text="Alunos"
            />
            <MenuItem
              handleClick={handleCoursesClick}
              icon={books}
              text="Cursos"
            />
            <MenuItem
              handleClick={handleAttendanceClick}
              icon={attendance}
              text="Lista de Presença"
            />
            <MenuItem
              handleClick={handleTeachersClick}
              icon={teachers}
              text="Professores"
            />
            <MenuItem
              handleClick={handleStudentsClassClick}
              icon={desk}
              text="Turmas"
            />
          </li>
        </StyledList>
      </nav>
    </div>
  );
};
export default withRouter(Menu);
