import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SideMenu.css";
// import stacker from '../images/stacker.png';

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      isDropdownOpen2: false,
    };
  }

  toggleDropdown = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  };

  toggleDropdown2 = () => {
    this.setState({ isDropdownOpen2: !this.state.isDropdownOpen2 });
  };

  render() {
    const { setActiveComponent } = this.props;
    const { isDropdownOpen, isDropdownOpen2 } = this.state;

    return (
      <>
        <div className="flex h-screen bg-gray-200 overflow-y-auto" style={{position:'relative'}}>
          <div className="flex-shrink-0 w-78 bg-white border-r">
            <div className="flex items-center justify-start h-16">
              {/* <img className='h-[22rem] w-[20rem]' src={stacker} alt="Logo" /> */}
              {/* <span className="text-xl font-semibold text-gray-800">Stacker</span> */}
            </div>

            <nav className="mt-2">
              <div className="space-y-1">
                <p className="flex items-center p-4 text-gray-900 hover:bg-gray-100 border-b-2">
                  <span className="mr-2 text-[1.5rem] font-semibold">
                    Edit Salon Profile
                  </span>
                </p>

                <button
                  onClick={() => setActiveComponent("EditProfile")}
                  className="flex items-center p-4 text-gray-700 hover:bg-gray-100 border-b-2"
                >
                  <span className="mr-2 ">Edit Profile</span>
                </button>
                <button
                  onClick={() => setActiveComponent("ServiceSelector")}
                  className="flex items-center p-4 text-gray-700 hover:bg-gray-100 border-b-2"
                >
                  <span className="mr-2 ">Manage Services</span>
                </button>
                {/* <button
                  onClick={() => setActiveComponent("OffersManage")}
                  className="flex items-center p-4 text-gray-700 hover:bg-gray-100 border-b-2"
                >
                  <span className="mr-2 ">Offers Management</span>
                </button> */}
            
                <p className="flex items-center p-4 text-gray-900 hover:bg-gray-100 border-b-2">
                  <span className="mr-2 text-[1.5rem] font-semibold">
                  Manage Appointment{" "}
                  </span>
                </p>

                <button
                  onClick={() => setActiveComponent("ViewAppointment")}
                  className="flex items-center p-4 text-gray-700 hover:bg-gray-100 border-b-2"
                >
                  <span className="mr-2 ">View Appointment</span>
                </button>
                <button
                  onClick={() => setActiveComponent("ViewPenddingAppointments")}
                  className="flex items-center p-4 text-gray-700 hover:bg-gray-100 border-b-2"
                >
                  <span className="mr-2 ">Pendding Appointments</span>
                </button>
                <button
                  onClick={() => setActiveComponent("ViewCompletedAppointments")}
                  className="flex items-center p-4 text-gray-700 hover:bg-gray-100 border-b-2"
                >
                  <span className="mr-2 ">Completed Appointments</span>
                </button>
                <button
                  onClick={() => setActiveComponent("ViewCanceledAppointments")}
                  className="flex items-center p-4 text-gray-700 hover:bg-gray-100 border-b-2"
                >
                  <span className="mr-2 ">Canceled Appointments</span>
                </button>
                <p className="flex items-center p-4 text-gray-900 hover:bg-gray-100 border-b-2">
                  <span className="mr-2 text-[1.5rem] font-semibold">
                    Customer
                  </span>
                </p>
                <Link
                  to="/cinfo"
                  className="flex items-center p-4 text-gray-700 hover:bg-gray-100 border-b-2"
                >
                  <span className="mr-2">Customer Info</span>
                </Link>
                {/* <Link
                  to="/cregister"
                  className="flex items-center p-4 text-gray-700 hover:bg-gray-100 border-b-2"
                >
                  <span className="mr-2">Customer Registration</span>
                </Link> */}
                {/* <div className="relative group">
                  <p
                    className="flex items-center p-4 text-gray-700 hover:bg-gray-100 border-b-2"
                    onClick={this.toggleDropdown2}
                  >
                    <span className="mr-2">Order Management</span>
                  </p>

                  <div
                    className={` ${
                      isDropdownOpen2 ? "block" : "hidden"
                    } mt-2 space-y-2 bg-white border-t-1 border-gray-200 rounded-md shadow-md`}
                  >
                    <Link
                      to="/norder"
                      className="flex items-center p-4 text-gray-700 hover:bg-gray-100 w-100"
                    >
                      New Orders
                    </Link>
                    <Link
                      to="/papproval"
                      className="flex items-center p-4 text-gray-700 hover:bg-gray-100"
                    >
                      Pending Approval
                    </Link>
                    <Link
                      to="/otrack"
                      className="flex items-center p-4 text-gray-700 hover:bg-gray-100 "
                    >
                      Order Tracking
                    </Link>
                    <Link
                      to="/support"
                      className="flex items-center p-4 text-gray-700 hover:bg-gray-100 "
                    >
                      Support
                    </Link>
                  </div>
                </div> */}
              </div>
            </nav>
          </div>
        </div>
      </>
    );
  }
}
