import React from 'react';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectIsFechingClasses, selectMyClasses } from '../../../redux/students-class/students-class.selectors';
import StudentsClassOverview from '../students-class-overview/students-class-overview.component';
import { ContainerStyled } from './students-class-list.styles';

import WithSpinner from '../with-spinner/with-spinner.component';


const StudentsClassList = () => {
  const classSelector = useSelector(selectMyClasses);

  return (
    <ContainerStyled>
      {
        classSelector.map(
          (studentsClass) => (
            <StudentsClassOverview
              classItem={studentsClass}
              key={studentsClass.id}
            />
          ),
        )
      }
    </ContainerStyled>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => selectIsFechingClasses(state),
  classes: (state) => selectMyClasses(state),
});
const StudentsClassListContainer = compose(
  connect(mapStateToProps),
  WithSpinner,
)(StudentsClassList);

export default StudentsClassListContainer;
