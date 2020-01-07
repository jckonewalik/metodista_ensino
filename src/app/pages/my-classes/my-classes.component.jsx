import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchClassesStart } from '../../../redux/students-class/students-class.actions';
import StudentsClassListContainer from '../../components/students-class-list/students-class-list.component';

const MyClassesPage = () => {
  const dispatch = useDispatch();
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
