import React, { Component } from 'react';
// import './App.css';
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import SideMenu from './SideMenu';
import ServiceSelector from './ServiceSelector';
import UserDataTable from './UserDataTable';
import ViewAppointment from './ViewAppointment';
import ViewCompletedAppointments from './ViewCompletedAppointments';
import ViewCanceledAppointments from './ViewCanceledAppointments';
import ViewPenddingAppointments from './ViewPenddingAppointments';
import Editprofile from './Editprofile';
export default class Adminhome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeComponent: null,
      isauth: true,
    };
    this.setActiveComponent = this.setActiveComponent.bind(this);
  }
  
  componentDidMount() {
    // Check if the user is authenticated
    const token1 = localStorage.getItem("token");
    if (token1!=null) {
      const decoded = jwtDecode(token1);
      const tokenvalue = decoded.user_id;
      console.log(tokenvalue);
      fetch(`/api/s-admin/${tokenvalue}`)
        .then((response) => {
          if (!response.ok) {
            this.setState({ isauth: false });
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          sessionStorage.setItem('fname', data.first_name);
            this.setState({ isauth: true });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
        // salon_id fetch by admin_id
        fetch(`/api/s-admin/r-salon/byadmin/${tokenvalue}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          sessionStorage.setItem('fname', data.first_name);
          sessionStorage.setItem('salon_id', data.salon_id);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      // Token is not available, user is not authenticated
      this.setState({ isauth: false });
    }
  }

  setActiveComponent(componentName) {
    this.setState({ activeComponent: componentName });
  }

  render() {
    const { activeComponent } = this.state;

    // Render the active component based on the state
    let componentToRender;
    switch (activeComponent) {
      case 'EditProfile':
        componentToRender = <Editprofile />;
        break;
      case 'ServiceSelector':
        componentToRender = <ServiceSelector />;
        break;
      case 'UserDataTable':
        componentToRender = <UserDataTable />;
        break;
      case 'ViewAppointment':
        componentToRender = <ViewAppointment />;
        break;
      case 'ViewCompletedAppointments':
        componentToRender = <ViewCompletedAppointments />;
        break;
      case 'ViewPenddingAppointments':
        componentToRender = <ViewPenddingAppointments />;
        break;
      case 'ViewCanceledAppointments':
        componentToRender = <ViewCanceledAppointments />;
        break;
      default:
        componentToRender = null;
    }

    return (
      <>
      {this.state.isauth ? (
        <div className="flex" style={{ backgroundColor: "#E1D9D1", position: "relative" }}>
            <SideMenu setActiveComponent={this.setActiveComponent} />
            {componentToRender}
            <div className="flex-1 p-6" style={{ backgroundColor:'lightyellow',position: "relative" }}>
              {/* <h1>Welcome To Glam & </h1> */}
            </div>
          </div>      ) : (
        <Navigate to="/s-login" />
      )}

      </>
    );
  }
}