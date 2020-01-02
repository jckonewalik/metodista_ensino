import React from 'react';
import { ButtonStyled, LabelStyled } from './custom-button.styles';

const CustomButton = ({ children, ...otherProps }) => (
  <ButtonStyled {...otherProps}>
    <LabelStyled>{children}</LabelStyled>
  </ButtonStyled>
);

export default CustomButton;
