import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector } from '../../../redux/user/user.selectors';
import { fetchClassesStart } from '../../../redux/students-class/students-class.actions';
import { setHeaderTitle } from '../../../redux/header/header.actions';
import StudentsClassListContainer from '../../components/students-class-list/students-class-list.component';

const MyClassesPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(currentUserSelector);
  useEffect(() => {
    dispatch(setHeaderTitle({ title: 'Minhas Turmas', subtitle: user && user.name }));
  }, [dispatch, user]);
  useEffect(() => {
    dispatch(fetchClassesStart());
  }, [dispatch]);
  return (
    <div>
      <StudentsClassListContainer />
    </div>
  );
};

export default MyClassesPage;
