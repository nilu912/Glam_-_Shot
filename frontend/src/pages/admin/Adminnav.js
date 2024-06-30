import React, { Component } from "react";
import '../components/navcss.css';
import { Link } from "react-router-dom";

export default class Adminnav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salonData: [], // Initial state for salon data
      loading: true, // Initial loading state
      error: null, // Initial error state
    };

  }

  componentDidMount() {
    // Fetch salon data from API
    fetch("/api/s-admin/r-salon/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          salonData: data, // Update salon data in state
          loading: false, // Set loading state to false
          error: null, // Clear any previous error
        });
      })
      .catch((error) => {
        this.setState({
          loading: false, // Set loading state to false
          error: error.message, // Update error message
        });
      });
  }

  render() {
    return (
      <div className="main-nav">
        <div className="logo">
          <h2>
            <span>G</span>lam
            <span>&</span>
            <span>S</span>hot
          </h2>
        </div>
        <div className="menu-Link">
           <ul className="menu-ul" >
            <li className="welcome-name">
                Welcome to Glam and Shot, {sessionStorage.getItem('fname')}
            </li>
          {/*  <li>
              <Link to="/" className="link-styles">
                Services
              </Link>
            </li>
            <li>
              <Link to="/" className="link-styles">
                About us
              </Link>
            </li>*/}
          </ul> 
        </div>
        <div className="menu-Join-us" style={{justifyContent:'end',color:'white',}}>
          <Link to="/s-login" onClick={() => { localStorage.removeItem('token');}}>
            Log-Out
          </ Link>
        </div>
      </div>
    );
  }
}
