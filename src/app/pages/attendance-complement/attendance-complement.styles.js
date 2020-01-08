import styled from 'styled-components';
import CustomButton from '../../components/custom-button/custom-button.component';

export const RootContainerStyled = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

export const BodyStyled = styled.div`
  margin: 50px auto 0;
  width: 100%;

  @media screen and (min-width: 400px) {
    max-width: 400px;
  }
`;

export const FooterStyled = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const ButtonStyled = styled(CustomButton)`
  width: 120px;
  height: 40px;
`;

export const LabelStyled = styled.span`
  margin-top: 40px;
  margin-left: 10px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
`;
