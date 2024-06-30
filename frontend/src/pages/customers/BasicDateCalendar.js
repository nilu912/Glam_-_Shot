import React, { Component } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

class BasicDateCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(), // initial date value
    };
  }

  handleDateChange = (newDate) => {
    this.setState({
      date: newDate,
    });
  };

  render() {
    const { date } = this.state;

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar onChange={this.handleDateChange} value={date} />
      </LocalizationProvider>
    );
  }
}

export default BasicDateCalendar;
