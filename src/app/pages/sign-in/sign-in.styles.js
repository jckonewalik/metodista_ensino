import styled from 'styled-components';
import CustomButton from '../../components/custom-button/custom-button.component';

export const MainContainerStyled = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  padding: 0 30px;

  @media screen and (min-width: 800px) {
    width: 400px;
    border: 1px solid #929292;
    border-radius: 5px;
    margin: 30px auto;
  }
`;

export const CustomButtonStyled = styled(CustomButton)`
  width: 100%;
  height: 50px;
  font-size: 16px;
  border-radius: 30px;
`;

export const ImageContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export const ImageStyled = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

export const OptionStyled = styled.a`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  font-size: 18px;
  color: #929292;
  text-decoration: none;
`;
