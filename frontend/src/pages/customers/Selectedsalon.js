import React, { Component } from "react";
import { jwtDecode } from "jwt-decode";
import Custnav from "./Custnav";
import AppointmentBooking from "./AppointmentBooking";
import Serviceslist from "./Serviceslist";
import { Navigate } from "react-router-dom";
import SelectedSalonSlider from "./selectedsalonslider";
import "./AppointmentBooking.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Footer from "./../components/Footer";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

const options = [
  {
    name: "Enable backdrop (default)",
    scroll: false,
    backdrop: true,
  },
  {
    name: "Disable backdrop",
    scroll: false,
    backdrop: false,
  },
  {
    name: "Enable body scrolling",
    scroll: true,
    backdrop: false,
  },
  {
    name: "Enable both scrolling & backdrop",
    scroll: true,
    backdrop: true,
  },
];

class OffCanvasExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  toggleShow = () => {
    this.setState((prevState) => ({
      show: !prevState.show,
    }));
  };

  render() {
    const { name, ...props } = this.props;
    const { show } = this.state;

    return (
      <>
        <Button variant="primary" onClick={this.toggleShow} className="me-2">
          {name}
        </Button>
        <Offcanvas show={show} onHide={this.handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }
}

class Selectedsalon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      app_id: null,
      salon_id: sessionStorage.getItem("selectedSalonId"),
      user_id: "",
      date_of_book: "",
      date_of_appointment: "",
      start_time: "10:00:00",
      end_time: this.handleInfo,
      tot_duration: "30:00",
      total_amm: "",
      canceled: "false",
      cancellation_reasion: null,
      status: "pending",
      app_mode: "salon",
      salonData: null,
      loading: true,
      error: null,
      available: false,
      show: false,
    };
    this.handleSubmitbutton = this.handleSubmitbutton.bind(this);
    this.fetchUniqueId();
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  toggleShow = () => {
    this.state.date_of_appointment = sessionStorage.getItem("selectedDate");
    this.state.start_time = sessionStorage.getItem("selectedTime");
    const startTime = this.state.start_time;
    const duration = this.state.tot_duration;
    console.log("total duration: ", this.state.tot_duration);
    const endTime = this.addTimeToDuration(startTime, duration);
    console.log(endTime);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");

    this.setState({
      end_time: endTime,
      date_of_book: `${year}-${month}-${day}`,
    });
    // this.state.date_of_book = `${year}-${month}-${day}`;
    this.setState((prevState) => ({
      show: !prevState.show,
    }));
  };

  fetchUniqueId = async () => {
    try {
      const response = await fetch("/api/generate-unique-appointment-id/");
      const data = await response.json();
      this.setState({ app_id: data.appointment_id });
      console.log(data);
      sessionStorage.setItem("app_id", data.appointment_id);
      // return data.p_id;
    } catch (error) {
      console.error("Error fetching unique app_id:", error);
    }
  };
  handleInfo = (e, fieldName) => {
    this.setState({
      [fieldName]: e.target.value,
    });
  };

  addTimeToDuration = (startTime, duration) => {
    // Parse startTime
    const timeParts = startTime.split(":");
    let hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    const seconds = parseInt(timeParts[2]);

    let totalTime = hours * 3600 + minutes * 60 + seconds;

    // Parse duration
    const [durationMinutes, durationSeconds] = duration.split(":").map(Number);
    const durationInSeconds = durationMinutes * 60 + durationSeconds;

    // Add duration to total time
    totalTime += durationInSeconds;

    // Calculate new hours, minutes, and seconds
    const newHours = Math.floor(totalTime / 3600) % 24;
    const newMinutes = Math.floor((totalTime % 3600) / 60);
    const newSeconds = totalTime % 60;

    // Format the result
    const newTime = `${newHours}:${String(newMinutes).padStart(
      2,
      "0"
    )}:${String(newSeconds).padStart(2, "0")}`;

    return newTime;
  };

  handleSubmitbutton = async (e) => {
    e.preventDefault();
    // console.log(
    //   this.state.date_of_appointment,
    //   this.state.start_time,
    //   // this.state.tot_duration
    // );
    this.state.date_of_appointment = sessionStorage.getItem("selectedDate");
    this.state.start_time = sessionStorage.getItem("selectedTime");
    const startTime = this.state.start_time;
    const duration = this.state.tot_duration;
    const endTime = this.addTimeToDuration(startTime, duration);
    console.log(endTime);
    // this.setState({end_time: endTime});
    // console.log(this.state.end_time);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");

    this.state.date_of_book = `${year}-${month}-${day}`;
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          app_id: parseInt(this.state.app_id),
          salon_id: parseInt(this.state.salon_id),
          user_id: this.state.user_id,
          date_of_book: this.state.date_of_book,
          date_of_appointment: sessionStorage.getItem("selectedDate"),
          start_time: this.state.start_time,
          end_time: endTime,
          tot_duration: this.state.tot_duration,
          total_amm: parseInt(this.state.total_amm),
          canceled: false,
          cancellation_reasion: null,
          app_status: "pending",
          app_mode: this.state.app_mode,
        }),
      };
      // console.log(requestOptions.body);
      const response = await fetch("/api/appointments/", requestOptions);
      const appointmentData = await response.json();
      console.log(appointmentData);

      // Navigate to the desired route after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    const selectedServices = JSON.parse(
      sessionStorage.getItem("selectedServices")
    ); // Parse JSON
    console.log("dasdsa");
    console.log(selectedServices);
    try {
      for (const serviceId of selectedServices) {
        const selectedservicerequestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            app_id: this.state.app_id,
            service_id: serviceId,
            // offer_id: null,
          }),
        };
        // console.log(selectedservicerequestOptions.body);
        const response = await fetch(
          "/api/s-admin/r-salon/provided_services/",
          selectedservicerequestOptions
        );
        const responseData = await response.json();

        console.log(responseData);
      }
    } catch (error) {
      console.error("Error saving selected services:", error);
    }
    alert("Appointment Successful");
    <Navigate to="/customer" />;
  };
  handleCalcTotDuration = (calcVal) => {
    // console.log(calcVal);
    this.state.tot_duration = calcVal;
    // console.log(this.state.tot_duration);
  };
  handleCalcTotCharge = (cacTotCharge) => {
    this.state.total_amm = cacTotCharge;
    // console.log(this.state.total_amm);
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    // console.log(decoded.user_id);
    this.state.user_id = decoded.user_id;
    // console.log(this.state.user_id);
    const id = sessionStorage.getItem("selectedSalonId");
    // console.log('id', id);
    //fetching salon info
    fetch(`/api/s-admin/r-salon/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          salonData: data,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.message,
        });
      });
  }

  render() {
    const { salonData, loading, error } = this.state;
    const { name, ...props } = this.props;
    const { show } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div>
        <Custnav />
        <div style={{width:'100%',justifyContent:'center',display:'flex',color:'white',margin:'2rem 2rem'}}>
        <h1 style={{fontFamily: 'Roboto, sans-serif',textShadow: '2px 2px 4px white'}}>Welcome to {salonData.salon_name}</h1>
        </div>
        <SelectedSalonSlider />
        {/* Render other details about the selected salon */}
        <form className="selectedsalonmaindiv">
        <div style={{width:'100%',justifyContent:'center',display:'flex',color:'white',margin:'2rem 2rem',}}>
        <h1 style={{textShadow: '2px 2px 4px white'}}>Book Appointment</h1>
        </div>

          <div className="service">
            <Serviceslist
              onCalcTotDuration={this.handleCalcTotDuration}
              onCalcTotCharge={this.handleCalcTotCharge}
            />
          </div>
          <div style={{borderRight:'1px solid white',borderRadius:'15px'}}>
            <AppointmentBooking />
          </div>
          <div className="selectservicefor">
            <FormControl style={{display:'flex',flexDirection:'row',}}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ color: "white", fontSize: "2rem" }}
              >
                Book Appointment For Your Home/Salon
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="salon"
                name="radio-buttons-group"
                style={{ color: "white", fontSize: "2rem",display:'flex',flexDirection:'row',marginLeft:'5rem',}}
              >
                <FormControlLabel
                  value="salon"
                  control={<Radio />}
                  label="Salon"
                  style={{ color: "white", fontSize: "2rem" }}
                  onChange={() => this.setState({ app_mode: "salon" })}
                />
                <FormControlLabel
                  value="home"
                  control={<Radio />}
                  label="Home"
                  style={{ color: "white", fontSize: "2rem" }}
                  onChange={() => this.setState({ app_mode: "home" })}
                />
              </RadioGroup>
            </FormControl>
            {/* <input
              type="radio"
              name="mode"
              value="salon"
              onChange={() => this.setState({ app_mode: "salon" })}
            />{" "}
            Book Appointment For Salon
            <br />
            <input
              type="radio"
              name="mode"
              value="home"
              onChange={() => this.setState({ app_mode: "home" })}
            />{" "}
            Book Appointment For Home */}
          </div>
          {/* <Button variant="primary" onClick={this.handleSubmitbutton}>
            Submit
          </Button>{" "} */}
          <div style={{width:'100%',justifyContent:'center',display:'flex',margin:'2rem 2rem'}}>
          <Button variant="primary" onClick={this.toggleShow} className="me-2" style={{fontSize:'1.6rem',width:'20rem'}}>
            Submit Info
          </Button>
          </div>
          <Offcanvas
            show={show}
            onHide={this.handleClose}
            {...props}
            style={{ width: "80rem", padding: "4rem" }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Conform Appointment Booking</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <MDBContainer>
                <MDBRow>
                  <MDBCol lg="8">
                    <MDBCard className="mb-4">
                      <MDBCardBody>
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Appointment Id</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            {/* <MDBCardText className="text-muted">Johnatan Smith</MDBCardText> */}
                            <label
                              style={{ fontWeight: "4em", fontSize: "1.3rem" }}
                            >
                              {this.state.app_id}
                            </label>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Date Of Book</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            {/* <MDBCardText className="text-muted">Johnatan Smith</MDBCardText> */}
                            <label
                              style={{ fontWeight: "4em", fontSize: "1.3rem" }}
                            >
                              {this.state.date_of_book}
                            </label>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Date Of Appointment</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <label
                              style={{ fontWeight: "4em", fontSize: "1.3rem" }}
                            >
                              {sessionStorage.getItem("selectedDate")}
                            </label>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Appointment Start Time</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <label
                              style={{ fontWeight: "4em", fontSize: "1.3rem" }}
                            >
                              {this.state.start_time}
                            </label>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Appointment End Time</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <label
                              style={{ fontWeight: "4em", fontSize: "1.3rem" }}
                            >
                              {this.state.end_time}
                            </label>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Totoal Duration</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <label
                              style={{ fontWeight: "4em", fontSize: "1.3rem" }}
                            >
                              {this.state.tot_duration + " min"}
                            </label>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Total Ammount</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <label
                              style={{ fontWeight: "4em", fontSize: "1.3rem" }}
                            >
                              ₹ {this.state.total_amm}
                            </label>
                          </MDBCol>
                        </MDBRow>
                        <hr />{" "}
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Appointment Mode</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <label
                              style={{ fontWeight: "4em", fontSize: "1.3rem" }}
                            >
                              {this.state.app_mode}
                            </label>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3"></MDBCol>
                          <MDBCol sm="9">
                            <Button
                              variant="primary"
                              onClick={this.handleSubmitbutton}
                            >
                              Conform Booking
                            </Button>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </Offcanvas.Body>
          </Offcanvas>
          {/* <button onClick={this.handleSubmitbutton}>Submit</button> */}
        </form>
        <Footer />
      </div>
    );
  }
}

export default Selectedsalon;
