import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { ContainerStyled } from './date-picker-bar.styles';

const DatePickerBarComponent = ({ date = new Date(), handleChange }) => (
  <div>
    <ContainerStyled>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          format="dd/MM/yyyy"
          value={date}
          onChange={handleChange}
        />
      </MuiPickersUtilsProvider>
    </ContainerStyled>
  </div>
);

export default DatePickerBarComponent;
