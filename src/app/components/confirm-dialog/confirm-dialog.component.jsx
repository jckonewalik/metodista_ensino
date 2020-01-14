import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const ConfirmDialog = ({
  open, message, handleYes, handleNo,
}) => (
  <Dialog
    open={open}
    onClose={handleNo}
    aria-labelledby="responsive-dialog-title"
  >
    <DialogContent>
      <DialogContentText>
        {message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleNo} color="primary">
          Não
      </Button>
      <Button onClick={handleYes} color="primary" autoFocus>
          Sim
      </Button>
    </DialogActions>
  </Dialog>

);

export default ConfirmDialog;
