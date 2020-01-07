import React from 'react';
import { IconButton } from '@material-ui/core';
import { ImageStyled } from './custom-touchable-icon.styles';

const CustomTouchableIcon = ({ isOpacity, sourceImage, ...otherProps }) => (
  <IconButton {...otherProps}>
    {
    sourceImage
      ? <ImageStyled isOpacity={isOpacity} src={sourceImage} />
      : null
    }
  </IconButton>
);

export default CustomTouchableIcon;
