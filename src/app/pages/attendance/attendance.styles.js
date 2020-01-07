import styled from 'styled-components';

import CustomButton from '../../components/custom-button/custom-button.component';

export const ButtonContainerStyled = styled.div`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const CustomButtonStyled = styled(CustomButton)`
  width: 120px;
  height: 40px;
`;

export const AttendanceListContainerStyled = styled.div`
  max-height: 430px;
  margin-top: 30px;
  overflow: hidden;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;
