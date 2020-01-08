import styled from 'styled-components';

import CustomButton from '../../components/custom-button/custom-button.component';

export const MainContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

export const ButtonContainerStyled = styled.div`
  display: flex;
  flex: 1;
  margin: 15px 0 ;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const CustomButtonStyled = styled(CustomButton)`
  width: 120px;
  height: 40px;
`;

export const AttendanceListContainerStyled = styled.div`
  margin-top: 30px;
  overflow: hidden;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;

  @media screen and (min-width: 900px) {
    width: 800px;
    margin: 30px auto 0;
  }
`;
