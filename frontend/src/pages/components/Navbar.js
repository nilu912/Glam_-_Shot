import React, { Component } from "react";
import "./navcss.css";
import OffCanvas from "./navbar-offcanva";
import { Outlet, Link } from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="main-nav">
        <div className="logo" style={{height:"10rem"}}>
          <h2>
            <span>G</span>lam
            <span>&</span>
            <span>S</span>hot
          </h2>
        </div>
        <div className="menu-Link">
          <ul className="menu-ul">
            <li>
              <Link to="/" className="link-styles">Home</Link>
            </li>
            <li>
              <Link to="/about" className="link-styles">About us</Link>
            </li>
            <li>
              <Link to="/termsandconditions" className="link-styles">Terms And Conditions</Link>
            </li>
          </ul>
        </div>
        <div className="menu-Join-us">
          <h2>
            <OffCanvas className="menu-Join-us-link"/>
          </h2>
        </div>
      </div>
    );
  }
}
