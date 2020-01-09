import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  Input,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import {
  ContainerStyled,
  ContentContainerStyled,
  LabelStyled,
  ValueStyled,
  CustomButtonStyled,
} from './custom-picker-button.styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));
const CustomPickerButton = ({
  label, value, options, handleChange,
}) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);

  const findById = (id) => options.filter((option) => option.id === id)[0] || '';
  const onValueChange = ({ target }) => {
    handleChange(target.value);
  };
  const handleClose = () => { setShow(false); };
  return (
    <>
      <ContainerStyled onClick={() => setShow(true)}>
        <ContentContainerStyled>
          {
            value ? (
              <>
                <LabelStyled>{label}</LabelStyled>
                <ValueStyled>{value && value.name}</ValueStyled>
              </>
            )
              : <LabelStyled>{`SELECIONAR ${label}`}</LabelStyled>
          }
        </ContentContainerStyled>
      </ContainerStyled>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={show}
        onClose={handleClose}
      >
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="dialog-select">{label}</InputLabel>
              <Select
                id="dialog-select"
                value={findById(value && value.id)}
                onChange={onValueChange}
                input={<Input />}
              >
                <MenuItem value="">
                  <em>Selecione</em>
                </MenuItem>
                {
                  options.map((opt) => (
                    <MenuItem key={opt.id} value={opt}>
                      {opt.name}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <CustomButtonStyled onClick={handleClose}>
            Cancel
          </CustomButtonStyled>
          <CustomButtonStyled onClick={handleClose}>
            Ok
          </CustomButtonStyled>
        </DialogActions>
      </Dialog>
    </>

  );
};
export default CustomPickerButton;
