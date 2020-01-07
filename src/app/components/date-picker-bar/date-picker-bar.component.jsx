import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { ContainerStyled } from './date-picker-bar.styles';
import CustomTouchableIcon from '../custom-touchable-icon/custom-touchable-icon.component';
import arrowLeft from '../../../assets/arrow-left.png';
import arrowRight from '../../../assets/arrow-right.png';
import back from '../../../assets/back.png';
import next from '../../../assets/next.png';

const DatePickerBarComponent = ({ date = new Date(), handleChange }) => {
  const addDays = (days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    handleChange(newDate);
  };

  const addMonths = (days) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + days);
    handleChange(newDate);
  };

  return (
    <div>
      <ContainerStyled>
        <CustomTouchableIcon onClick={() => addMonths(-1)} sourceImage={back} />
        <CustomTouchableIcon onClick={() => addDays(-1)} sourceImage={arrowLeft} />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            format="dd/MM/yyyy"
            value={date}
            onChange={handleChange}
          />
        </MuiPickersUtilsProvider>
        <CustomTouchableIcon onClick={() => addDays(1)} sourceImage={arrowRight} />
        <CustomTouchableIcon onClick={() => addMonths(1)} sourceImage={next} />
      </ContainerStyled>
    </div>
  );
};

export default DatePickerBarComponent;
