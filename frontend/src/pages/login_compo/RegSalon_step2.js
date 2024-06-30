import React, { Component } from "react";
import { Link , Navigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { FaLock } from "react-icons/fa";
import "./regCss.css";
import { alertTitleClasses } from "@mui/material";

export default class RegSalon_step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salon_id: null,
      admin_id: null,
      user_address_id: null,
      salon_name: "",
      address: "",
      day: "",
      opening_time: "",
      closing_time: "",
      cust_gender: "Both",
      salon_password: "",
      retypepassword: "",
      pincode: "",
      val: false,
      //select day
      selectDays: [],
      isOpen: false,
      states: [],
      cities: [],
      selectedstate: "",
      selectedcity: "",
      weekdays: [
        { id: 1, label: "Sunday" },
        { id: 2, label: "Monday" },
        { id: 3, label: "Tuesday" },
        { id: 4, label: "Wednesday" },
        { id: 5, label: "Thursday" },
        { id: 6, label: "Friday" },
        { id: 7, label: "Saturday" },
      ],
    };
    this.handleSubmitbutton = this.handleSubmitbutton.bind(this);
    this.GetDataSessionStorage();
    this.fetchUniqueSalonId();
    this.fetchUniqueScheduleId();
    this.fetchstateandcitydata();
    this.fetchUniqueAddId();
  }
  GetDataSessionStorage() {
    // Retrieve data from sessionStorage
    setTimeout(() => {
      const storedData = sessionStorage.getItem("admin_id");
        this.setState({ admin_id: storedData });
    }, 500);
  }
  handleChangeSessionStorage = (event) => {
    // Update state and sessionStorage when input value changes
    const newData = this.state.salon_id;
    sessionStorage.setItem("salon_id", newData);
  };
  onstatechange = (event) => {
    const selectedState = event.target.value;
    this.setState({ selectedstate: selectedState }, () => {
      console.log("Selected state:", this.state.selectedstate);
    });
    try {
      fetch(`/api/city/bystate/${selectedState}`)
        .then(response => response.json())
        .then(data => { this.setState({ cities: data });
        })
        .catch(error => console.error("City data not fetched", error));
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };
    
  oncitychange = (event) => {
    this.setState({ selectedcity: event.target.value }, () => {
      console.log("Selected city:", this.state.selectedcity);
    });
  };
  fetchUniqueSalonId = async () => {
    //Generate a unique salon_id API
    try {
      const response = await fetch("/api/generate-unique-salon-id/");
      const data = await response.json();
      this.setState({ salon_id: data.salon_id });
    } catch (error) {
      console.error("Error fetching unique salon_id:", error);
    }
  };
  fetchUniqueAddId = async () => {
    try {
      const response = await fetch("/api/generate-unique-address-id/");
      const data = await response.json();
      this.setState({ user_address_id: data.user_address_id});
      console.log(this.state.user_address_id);
    } catch (error) {
      console.error("Error fetching unique p_id:", error);
    }
  };
  fetchUniqueScheduleId = async () => {
    //Generate a unique schedule API
    try{
      const response = await fetch("/api/generate-unique-schedule-id/");
      const data = await response.json();
      this.setState({ schedule_id: data.schedule_id });
    } catch (error) {
      console.error("Error fetching unique schedule_id:", error);
    }
  }
  fetchstateandcitydata = async () => {
    try {
      const response = await fetch("/api/state/");
      const data = await response.json();
      this.setState({ states: data });
      // return data.p_id;
    } catch (error) {
      console.error((error) => console.error("States data not fatch", error));
    }
    try {
      const response = await fetch("/api/city/");
      const data = await response.json();
      this.setState({ cities: data });
      // return data.p_id;
    } catch (error) {
      console.error((error) => console.error("Citiy data not fatch", error));
    }
  };

  handleInfo = (e, fieldName) => {
    // if (fieldName === 'mob' && value.length > 10) {
    //   value = value.slice(0, 10);
    // }
    // if (fieldName === 'pincode' && value.length > 6) {
    //   value = value.slice(0, 6);
    // }
    //Set the state value from the form
    this.setState({
      [fieldName]: e.target.value,
    });
  };

  handleSubmitbutton = async (e) => {
    //Submit button API calls
    e.preventDefault();
    this.daysSelected();
    console.log("admin id "+this.state.admin_id);    
    console.log("salon id "+this.state.salon_id);    
    console.log("schedule id "+this.state.schedule_id);    

    if (this.state.salon_password === this.state.retypepassword) {
      try {
        const addressinfo = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            salon_address_id: this.state.user_address_id,
            address: this.state.address,
            pincode: this.state.pincode,
            city_id: this.state.selectedcity,
            state_id: this.state.selectedstate,
          }),
        };
        const addressresponse = await fetch("/api/salonaddress/", addressinfo);
        const addressData = await addressresponse.json();

        const SalonPostReqeust = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            salon_id: this.state.salon_id,
            salon_password: this.state.salon_password,
            admin_id: this.state.admin_id,
            salon_name: this.state.salon_name,
            salon_address_id: this.state.user_address_id,
            cust_gender: this.state.cust_gender,
          }),
        };
        console.log(JSON.stringify(SalonPostReqeust, null, 2));
        const response = await fetch("/api/s-admin/r-salon/", SalonPostReqeust);
        const salonData = await response.json();

        const SalonSchedulePostReq = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            schedule_id: this.state.schedule_id,
            salon_id: this.state.salon_id,
            day: this.state.day,
            opening_time: this.state.opening_time,
            closing_time: this.state.closing_time,
          }),
        };
        console.log(JSON.stringify(SalonSchedulePostReq, null, 2));
        const custResponse = await fetch(
          "/api/s-admin/r-salon/schedule/",
          SalonSchedulePostReq
        );
        const scheduleData = await custResponse.json();
        console.log(addressData, salonData, scheduleData);

        // Navigate to the desired route after successful submission
        // this.setState({ val: true });
        this.props.nextPage();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      console.log("password not same");
    }
  };

  // Day select methods
  dropDownShow = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  dayChange = (event) => {
    const dayId = parseInt(event.target.value);
    const choosen = event.target.checked;

    if (choosen) {
      this.setState((prevState) => ({
        selectDays: [...prevState.selectDays, dayId],
      }));
    } else {
      this.setState((prevState) => ({
        selectDays: prevState.selectDays.filter((id) => id !== dayId),
      }));
    }
  };
  daysSelected = async (e) => {
    let selecteddays = "";
    for (let i = 0; i < this.state.selectDays.length; i++) {
      const selectedDayId = this.state.selectDays[i];
      const selectedDay = this.state.weekdays.find(
        (day) => day.id === selectedDayId
      );
      console.log(selectedDay.label);
      selecteddays += selectedDay.label + ",";
    }
    this.state.day = selecteddays;
    console.log(this.state.day);
  };

  render() {
    const { selectDays, isOpen, weekdays } = this.state;
    const { states, selectedstate, cities, selectedcity } = this.state;

    return (
      <>
        <div className="reg-salon">
          <div className="blur-background"></div>
          <div className="reg-inner container1">
            <form onSubmit={this.handleSubmitbutton}>
              <h1>Register Your Salon Info</h1>
              <div className="input-box item11">
                <input
                  type="text"
                  placeholder="Salon Name"
                  required
                  onChange={(e) => this.handleInfo(e, "salon_name")}
                />
              </div>
              <div className="input-box item12">
                <input
                  type="text"
                  placeholder="Opening Time"
                  onFocus={(e) => (e.target.type = "time")}
                  onBlur={(e) => (e.target.type = "text")}
                  required
                  onChange={(e) => this.handleInfo(e, "opening_time")}
                />
              </div>
              <div className="input-box item13">
                <input
                  type="text"
                  placeholder="Closing Time"
                  onFocus={(e) => (e.target.type = "time")}
                  onBlur={(e) => (e.target.type = "text")}
                  required
                  onChange={(e) => this.handleInfo(e, "closing_time")}
                />
              </div>
              <div
                style={{
                  marginLeft: "11%",
                  marginTop: "2%",
                  fontSize: "1.5rem",
                }}
              >
                    <div className="weekselect">
                      <div className="headname"><h2>Select Working days</h2></div>
                      <div
                        // className={`custom-dropdown-menu ${
                        //   isOpen ? "show" : ""
                        // }`}
                        className="dayselectcheckbox"
                        style={{ color: "white" }}
                        aria-labelledby="multiSelectDropdown"
                      >
                        {weekdays.map((option) => (
                          <div className="weekdayitem" ><Form.Check
                            className="custom-checkbox"
                            key={option.id}
                            style={{ color: "white" }}
                            type="checkbox"
                            id={`option_${option.id}`}
                            label={option.label}
                            checked={selectDays.includes(option.id)}
                            onChange={this.dayChange}
                            value={option.id}
                          /></div>
                        ))}
                      </div>
                      </div>
              </div>
              <div className="input-box item14">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => this.handleInfo(e, "salon_password")}
                />
                {/* <FaLock className="icon" /> */}
              </div>
              <div className="input-box item15">
                <input
                  type="password"
                  placeholder="Re-Type-Password"
                  required
                  onChange={(e) => this.handleInfo(e, "retypepassword")}
                />
                {/* <FaLock className="icon" /> */}
              </div>
              <div className="input-box item16">
                <input
                  type="text"
                  placeholder="Address"
                  required
                  onChange={(e) => this.handleInfo(e, "address")}
                />
              </div>
              <div className="input-box item9-2">
                <input
                  type="number"
                  placeholder="Pincode"
                  required
                  onInput={(e) => {
                    if (e.target.value.length > 6) {
                      e.target.value = e.target.value.slice(0, 6); // Truncate the input to 10 characters
                    }
                    this.handleInfo(e, "mob");
                  }}

                  onChange={(e) => this.handleInfo(e, "pincode")}
                />
              </div>
              <div className=" item-state">
                <select
                  value={selectedstate}
                  onChange={this.onstatechange}
                  className="select_state_value"
                >
                  <option value="">Select a state</option>
                  {states.map((state) => (
                    <option key={state.state_id} value={state.state_id}>
                      {state.state_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="item-city">
                <select
                  value={selectedcity}
                  onChange={this.oncitychange}
                  className="select_citys_value"
                >
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city.city_id} value={city.city_id}>
                      {city.city_name}
                    </option>
                  ))}
                </select>              </div>

              <div className="reg-btn">
                <button className="regen-btn" type="submit">Finish</button>
              </div>
              <div className="login-link">
                <p>
                  Do you have an account? <Link to="/s-login">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}