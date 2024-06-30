import React, { Component } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import Custnave from "./Custnav";
import Salonlist from "./Salonlist";
// import Footer from "./../components/Footer";

export default class Customerhome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isauth: true,
    };
  }

  componentDidMount() {
    // Check if the user is authenticated
    const token1 = localStorage.getItem("token");
    if (token1!=null) {
      const decoded = jwtDecode(token1);
      const tokenvalue = decoded.user_id;
      console.log(tokenvalue);
      fetch(`/api/customers/${tokenvalue}`)
      .then((response) => {
        if (!response.ok) {
          this.setState({ isauth: false });
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        sessionStorage.setItem('fname', data.first_name);
          // Update the state using setState
          this.setState({ isauth: true });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    } else {
      // Token is not available, user is not authenticated
      this.setState({ isauth: false });
      console.log("token not get");
    }
  }

  render() {
    console.log(this.state.isauth);

    return (
      <>
      
      {this.state.isauth ? (
        <>
          <Custnave />
          <Salonlist />
          {/* <Footer /> */}
        </>
      ) : (
        <Navigate to="/c-login" />
      )}
    </>    
    );
  }
}
