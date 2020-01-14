import React from 'react';
import {
  GroupContainer,
  FormInputStyled,
  FormInputLabelStyled,
} from './form-input.styles';

const FormInput = ({
  label, handleChange, ...otherProps
}) => (
  <GroupContainer>
    <FormInputStyled onChange={handleChange} {...otherProps} />
    {label ? (
      <FormInputLabelStyled className={`${otherProps.value.length || otherProps.value === 0 ? 'shrink' : ''}`}>
        {label}
      </FormInputLabelStyled>
    ) : null}
  </GroupContainer>
);

export default FormInput;
