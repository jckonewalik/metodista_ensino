import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@material-ui/core';
import { CustomButtonStyled } from './custom-dialog.styles';

export const CustomInfoDialog = ({
  open, title, message, handleOkClick,
}) => (
  <Dialog
    open={open}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <CustomButtonStyled onClick={handleOkClick}>Ok</CustomButtonStyled>
    </DialogActions>
  </Dialog>
);
