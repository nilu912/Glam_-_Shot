import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import './herosection.css';
import logo from "./../../../static/images/CREATE_A_white_LOGO_MYvibe_of_salon_scissors_co-removebg-preview.png";
import h1 from "./../../../static/images/create_an_image_of_model_men_in_salon_and_having-removebg-preview.png";
// import WeekdaySelector from "./WeekdayPicker";
// import FullFeaturedCrudGrid from "./FullFeaturedCrudGrid";
export default class Herosection extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
  <div className="nav">
    {/* <img
      className="logo"
      src={logo}
    /> */}
    {/* <div>
      <div className="login-circle" />
    </div> */}
  </div>
  <div className="body-div">
    <div>
      <div className="write-div">
        <p className="write">
          Transform Your
          <br /> <span className="highlight-text">Beauty</span> Routine
          <br /> with Nearby Salon
          <br /> - <span className="highlight-text1">No More Lines</span>,<br />{" "}
          Just Glam!
        </p>
      </div>
      <div className="button-div">
      <Link to="/customer"><button className="primary-book">Book an Appointment</button></Link>
      <Link to="/admin"><button className="sec-book">Boost Your Business</button></Link>
      </div>
    </div>
  </div>
  <div className="foot">
    <div>
      <div className="symbol" />
      <p className="symbol-text">Great Quality Service</p>
    </div>
    <div className="symbol-div">
      <div className="symbol">
        <faheart />
      </div>
      <p className="symbol-text">100% Satisfaction Guarrantee</p>
    </div>
    <div className="image-div">
      <img
        className="model-img"
        src={h1}
      />
    </div>
  </div>
</>
    );
  }
}
