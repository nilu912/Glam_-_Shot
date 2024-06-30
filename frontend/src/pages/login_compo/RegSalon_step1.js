import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import "./loginCss.css";

export default class RegSalon_step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      p_id: null,
      admin_id: null,
      user_address_id: null,
      first_name: this.handleInfo,
      last_name: this.handleInfo,
      dob: this.handleInfo,
      gender: this.handleInfo,
      mob: this.handleInfo,
      email: this.handleInfo,
      address: this.handleInfo,
      pincode: this.handleInfo,
      password: this.handleInfo,
      retypepassword: this.handleInfo,
      // p_id: this.fetchUniqueId,
      val: false,
      states: [],
      cities: [],
      selectedstate: "",
      selectedcity: "",
    };
    this.handleSubmitbutton = this.handleSubmitbutton.bind(this);
    this.fetchUniquePId();
    this.fetchUniqueAdminId();
    this.fetchUniqueAddId();
    this.fetchstateandcitydata();
  }

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
  };  // GetDataSessionStorage() {
  //   // Retrieve data from sessionStorage
  //   const storedData = sessionStorage.getItem('admin_id');
  //   if (storedData) {
  //     this.setState({ admin_id: storedData });
  //   }
  // }
  handleChangeSessionStorage = (event) => {
    // Update state and sessionStorage when input value changes
    const newData = this.state.admin_id;
    sessionStorage.setItem("admin_id", newData);
  };

  fetchUniquePId = async () => {
    //Generate a unique p_id API
    try {
      const response = await fetch("/api/generate-unique-p-id/");
      const data = await response.json();
      this.setState({ p_id: data.p_id });
      console.log(this.state.p_id);
      // return data.p_id;
    } catch (error) {
      console.error("Error fetching unique p_id:", error);
    }
  };
  fetchUniqueAdminId = async () => {
    //Generate a unique admin_id API
    try {
      const response = await fetch("/api/generate-unique-admin-id/");
      const data = await response.json();
      this.setState({ admin_id: data.admin_id });
    } catch (error) {
      console.error("Error fetching unique admin_id:", error);
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
  fetchstateandcitydata = async () => {
    try {
      const response = await fetch("/api/state/");
      const data = await response.json();
      // console.log(data);
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
    const value = e.target.value;
    //Set the state value from the form
    if (fieldName === 'mob' && value.length > 10) {
      value = value.slice(0, 10);
    }
    if (fieldName === 'pincode' && value.length > 6) {
      value = value.slice(0, 6);
    }
    
    this.setState({
      [fieldName]: value,
    });
  };
  handleSubmitbutton = async (e) => {
    //Submit button API calls
    e.preventDefault();
    this.handleChangeSessionStorage();
    if (this.state.password === this.state.retypepassword) {
      try {
        const addressinfo = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_address_id: this.state.user_address_id,
            address: this.state.address,
            pincode: this.state.pincode,
            city_id: this.state.selectedcity,
            state_id: this.state.selectedstate,
          }),
        };
        const addressresponse = await fetch("/api/useraddress/", addressinfo);
        const addressData = await addressresponse.json();

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            p_id: this.state.p_id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            dob: this.state.dob,
            gender: this.state.gender,
            mob: this.state.mob,
            email: this.state.email,
            user_address_id: this.state.user_address_id,
            val: false,
          }),
        };
        const response = await fetch("/api/profiles/", requestOptions);
        const profileData = await response.json();


        const custData = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            p_id: this.state.p_id,
            admin_id: this.state.admin_id,
            password: this.state.password,
          }),
        };
        console.log(JSON.stringify(custData, null, 2));
        const custResponse = await fetch("/api/s-admin/", custData);
        const customerData = await custResponse.json();

        console.log(profileData, addressData, customerData);
        
        // Navigate to the desired route after successful submission
        this.props.nextPage();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      console.log("Passwrod are not match");
    }
  };
  
  render() {
    const { states, selectedstate, cities, selectedcity } = this.state;

    return (
      <>
        {" "}
        <div className="reg-salon">
          <div className="blur-background"></div>
          <div className="reg-inner container1">
            <form onSubmit={this.handleSubmitbutton}>
              <h1>Register Your Profile(Salon Owner)</h1>
              <div className="input-box item1">
                <input
                  type="text"
                  placeholder="FirstName"
                  required
                  onChange={(e) => this.handleInfo(e, "first_name")}
                />
                {/* <FaUser className="icon" /> */}
              </div>
              <div className="input-box item2">
                <input
                  type="text"
                  placeholder="LastName"
                  required
                  onChange={(e) => this.handleInfo(e, "last_name")}
                />
                {/* <FaUser className="icon" /> */}
              </div>
              <div className="input-box item3">
                <input
                  type="text"
                  placeholder="DateOfBirth"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  required
                  onChange={(e) => this.handleInfo(e, "dob")}
                />
                {/* <FaUser className="icon" /> */}
              </div>
              <div
                className="input-box item4"
                onChange={(e) => this.handleInfo(e, "gender")}
                style={{
                  width: "50%",
                  padding: "1%",
                  left: "4%",
                  "font-size": "1.6rem",
                }}
              >
                <input type="radio" name="gender" value="M" /> Male
                <input type="radio" name="gender" value="F" /> Female
              </div>
              <div className="input-box item5">
                <input
                  type="number"
                  placeholder="MobileNum"
                  required
                  value={this.state.mob} 
                  onChange={(e) => this.handleInfo(e, "mob")}
                />
                {/* <FaUser className="icon" /> */}
              </div>
              <div className="input-box item6">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(e) => this.handleInfo(e, "email")}
                />
                {/* <FaUser className="icon" /> */}
              </div>
              <div className="input-box item7">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => this.handleInfo(e, "password")}
                />
                {/* <FaLock className="icon" /> */}
              </div>
              <div className="input-box item8">
                <input
                  type="password"
                  placeholder="Re-Type-Password"
                  required
                  onChange={(e) => this.handleInfo(e, "retypepassword")}
                />
              </div>
              <div className="input-box item9">
                <input
                  type="text"
                  placeholder="Address"
                  required
                  onChange={(e) => this.handleInfo(e, "address")}
                />
              </div>
              <div className="input-box item9-1">
                <input
                  type="number"
                  placeholder="Pincode"
                  required
                  value={this.state.pincode} 
                  onChange={(e) => this.handleInfo(e, "pincode")}
                />
              </div>
              {/* <div className="input-box item9">
                <textarea
                  type="address"
                  placeholder="Address"
                  rows="1"
                  required
                  onChange={(e) => this.handleInfo(e, "address")}
                />
              </div> */}
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
                </select>
              </div>
              {/* <div className="remember-forgot">
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>
                <Link to="/">Already Have An Account.?</Link>
              </div> */}
              <div className="reg-btn">
                <button className="regen-btn" type="submit">
                  Next Page
                </button>
              </div>
              <div className="login-link">
                <p>
                  Do you have an account.?<Link to="/c-login"> Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
