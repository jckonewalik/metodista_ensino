import React from 'react';
import {
  GroupContainer,
  FormInputStyled,
  FormInputLabelStyled,
} from './form-input.styles';

const FormInput = ({ label, handleChange, ...otherProps }) => (
  <GroupContainer>
    <FormInputStyled onChange={handleChange} {...otherProps} />
    {label ? (
      <FormInputLabelStyled className={`${otherProps.value.length ? 'shrink' : ''}`}>
        {label}
      </FormInputLabelStyled>
    ) : null}
  </GroupContainer>
);

export default FormInput;
