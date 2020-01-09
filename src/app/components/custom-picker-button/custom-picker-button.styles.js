import styled from 'styled-components';
import CustomButton from '../custom-button/custom-button.component';

export const ContainerStyled = styled.div`
  margin: 10px 0;
  width: 100%;
`;

export const ContentContainerStyled = styled.div`
  display: flex;
  background: #F22333;
  min-height: 50px;
  justify-content: space-around;
  padding: 0 10px;
  align-items: center;
  border-radius: 30px;
`;

export const LabelStyled = styled.span`
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
`;

export const ValueStyled = styled.span`
  font-size: 16px;
  color: #fff;
`;

export const CustomButtonStyled = styled(CustomButton)`
  height: 30px;
`;
