import React from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCurrentClassStart } from '../../../redux/students-class/students-class.actions';
import {
  ContainerStyled,
  ClassContainerStyled,
  ClassNameStyled,
  ClassDescriptionStyled,
} from './students-class-overview.styles';
import Amount from '../amount/amount.component';

const StudentsClassOverview = ({ classItem, match, history }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentClassStart(classItem));
    history.push(`${match.path}/attendance-list`);
  };
  return (
    <ContainerStyled onClick={handleClick}>
      <ClassContainerStyled>
        <ClassNameStyled>{classItem.name}</ClassNameStyled>
        <ClassDescriptionStyled>{classItem.description}</ClassDescriptionStyled>
      </ClassContainerStyled>
      <Amount amount={classItem.amountOfStudents} label="ALUNOS" />
    </ContainerStyled>
  );
};

export default withRouter(StudentsClassOverview);
