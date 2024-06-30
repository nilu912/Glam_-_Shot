import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import "./loginCss.css";
import RegSalon_step1 from "./RegSalon_step1";
import RegSalon_step2 from "./RegSalon_step2";

export default class RegSalon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
  }
  nextPage = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };
  // previousPage = () =>{
  //   this.setState({ currentPage: this.state.currentPage - 1 });
  // }
  onSubmit = () => {
    console.log("submitted");
  };

  render() {
    return (
      <>
        <div className="reg-salon">
          {this.state.currentPage === 1 && (
            <RegSalon_step1 nextPage={this.nextPage} />
          )}
          {this.state.currentPage === 2 && (
            <RegSalon_step2 nextPage={this.nextPage} />
          )}
          {this.state.currentPage === 3 && (
            <Navigate to="/s-login" />
          )}
        </div>
      </>
    );
  }
}
