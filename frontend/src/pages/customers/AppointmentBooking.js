import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./AppointmentBooking.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import sa1 from "C:/Users/Chirag/Documents/Project/Glam_And_Shot/glam_and_shot/frontend/static/images/printable-digital-planner-template_7.png";

class AppointmentBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      time: '10:00 AM',
      opening_time: '',
      closing_time: '',
      timeSlots: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    const id = sessionStorage.getItem('selectedSalonId');
    fetch(`/api/s-admin/r-salon/schedule/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        const { opening_time, closing_time } = data;
        const formattedOpeningTime = this.convert24hrTo12hr(opening_time);
        const formattedClosingTime = this.convert24hrTo12hr(closing_time);
        const timeSlots = this.generateTimeSlots(formattedOpeningTime, formattedClosingTime, 30, this.state.date);
        this.setState({
          opening_time: formattedOpeningTime,
          closing_time: formattedClosingTime,
          timeSlots,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.message,
        });
      });
  }
  
  handleDateChange = (date) => {
    const { opening_time, closing_time } = this.state;
    this.setState({
      date,
      timeSlots: this.generateTimeSlots(opening_time, closing_time, 30, date),
    });
  };

  handleTimeChange = (time) => {
    this.setState({ time });
  };

  generateTimeSlots = (startTime, endTime, slotDuration, selectedDate) => {
    const today = new Date();
    const isToday = selectedDate.getDate() === today.getDate() && selectedDate.getMonth() === today.getMonth() && selectedDate.getFullYear() === today.getFullYear();
    let currentTime = isToday ? this.getCurrentTime() : this.convert12hrTo24hr(startTime);
    const endTime24hr = this.convert12hrTo24hr(endTime);
    const timeSlots = [];
    while (currentTime <= endTime24hr) {
      timeSlots.push(this.convert24hrTo12hr(currentTime));
      const [hours, minutes] = currentTime.split(':').map(Number);
      const newTime = new Date();
      newTime.setHours(hours);
      newTime.setMinutes(minutes);
      newTime.setMinutes(newTime.getMinutes() + slotDuration);
      currentTime = `${String(newTime.getHours()).padStart(2, '0')}:${String(newTime.getMinutes()).padStart(2, '0')}`;
    }
    return timeSlots;
  };

  getCurrentTime = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };

  convert12hrTo24hr = (time12hr) => {
    const [time, period] = time12hr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  convert24hrTo12hr = (time24hr) => {
    const [hours, minutes] = time24hr.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    let displayHours = hours % 12 || 12;
    return `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
  };

  
  handleBookAppointment = (e) => {
    e.preventDefault();
    const { date, time } = this.state;
    const salonId = sessionStorage.getItem('selectedSalonId');
    
    // Convert date to yyyy-mm-dd format
    console.log(date);
    const selectedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;    
    console.log(selectedDate);
    // Convert 12-hour time to 24-hour time
    const [timeStr, period] = time.split(' ');
    let [hours, minutes] = timeStr.split(':').map(Number);
    if (period === 'PM' && hours !== 12) {
        hours += 12;
    } else if (period === 'AM' && hours === 12) {
        hours = 0;
    }
    const selectedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
    // console.log(`/api/ch-appointments/?date_of_appointment=${selectedDate}&start_time=${selectedTime}`);
    // Send a request to check availability
    fetch(`/api/ch-appointments/?date_of_appointment=${selectedDate}&start_time=${selectedTime}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Failed to check availability');
        }
        return response.json();
    })
    .then((data) => {
        // Handle the response data to determine availability
        if (data.available == true) {
          alert("yes slot is available ");
          sessionStorage.setItem('selectedDate', selectedDate);
          sessionStorage.setItem('selectedTime', selectedTime);
          this.props.onAvailability(selectedDate,selectedTime); // Call the callback function with availability information
        } else {
          alert("sorry slot is not available you should check the next slot availability");
          console.log("slot not available"); // Call the callback function with availability information
        }
        // Call a function to handle availability data, e.g., display a message or book the appointment
    })
    .catch((error) => {
        console.error('Error checking availability:', error);
    });    
};

renderDayLabel = ({ date, view }) => {
  if (view === 'month') {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return <div style={{ fontWeight: 'bold' }}>{dayNames[date.getDay()]}</div>;
  }
  return null;
};

  render() {
    const { date, time, timeSlots, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <>
      <div className='bookappmaindiv'>
        <h3 className='mainheading'>Appointment Date/Time Select</h3>
        <div style={{display:'flex',justifyContent:'space-around',width:'100%'}}>
        <div style={{display:'flex',flexDirection:'row',alignItems:'center',}}>
        <div className='calenderdatesel'>
          <u><h2>Select Date</h2></u>
          {/* <BasicDateCalendar onChange={this.handleDateChange} value={date} /> */}
          <Calendar onChange={this.handleDateChange} value={date} />
        </div>
        <div className='calendertimesel'>
          <u><h2>Select Time</h2></u>
          <select value={time} onChange={(e) => {this.handleTimeChange(e.target.value);}}>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
        </div>
        <div style={{display:'flex',flexDirection:'row',alignItems:'center',marginLeft:'15rem'}}>
          <img src={sa1} alt="First slide" style={{width:'100%', height:'250px',borderRadius: '10px'}}/>
        </div>
        </div>
        <Stack className="chkavailablitiydate" spacing={2} direction="row">
          <Button variant="contained" style={{marginLeft:'40%'}} onClick={this.handleBookAppointment}>Check Availiblity</Button>
        </Stack>
      </div>
      </>
    );
  }
}

export default AppointmentBooking;
