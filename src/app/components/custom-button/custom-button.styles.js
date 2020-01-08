import styled, { css } from 'styled-components';

const getButtonColor = (props) => {
  if (props.disabled) {
    return css`background: #c2c2c2`;
  }
  return css`background: #F22333`;
};

export const ButtonStyled = styled.button`
  ${getButtonColor}
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  width: 100%;
  border-radius: 30px;
  border: none;
  min-height: 30px;
`;

export const LabelStyled = styled.span`
  color: #FFF;
  font-size: 16;
  font-weight: 700;
`;
