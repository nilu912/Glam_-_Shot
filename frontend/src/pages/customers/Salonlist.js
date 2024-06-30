// Salonlist.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Saloncart from "./Saloncart";
import "./Salonlist.css";
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';


export default class Salonlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salonData: [], // Initial state for salon data
      salonAddData: [],
      loading: true, // Initial loading state
      error: null, // Initial error state
      FilterByGender: "All",
      SalonName: "",
      states: [],
      cities: [],
      selectedstate: "",
      selectedcity: "",
    };
    this.AllSalonDataFetch();
    this.fetchstateandcitydata();
  }

  AllSalonDataFetch() {
    // Fetch salon data from API
    this.setState({
      FilterByGender: "All",
    });
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

      fetch("api/salonaddress/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          salonAddData: data, // Update salon data in state
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
  FilterByGender = (gender) => {
    this.setState({
      FilterByGender: gender,
    });
    fetch(`/api/s-admin/r-salon/bygender/${gender}`)
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
      
  };

  SearchSalonByName = () => {
    console.log(this.state.SalonName);
    fetch(`/api/s-admin/r-salon/bysalonname/${this.state.SalonName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        // console.log(sname);
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
  };
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
    fetch(`/api/s-admin/r-salon/bystate-id/${selectedState}`)
      .then(response => {
        if(!response.ok){
          throw new Error("Failed to fetch data");
        }
        return response.json();
      }).then((data) => {
        console.log(data);
        this.setState({salonData: data});
      }).catch((error) => {
        throw new Error("Failed to fetch data");
      });
  };
    
  oncitychange = (event) => {
    const c_id = event.target.value;
    this.setState({ selectedcity: c_id}, () => {
      console.log("Selected city:", this.state.selectedcity);
    });
    fetch(`/api/s-admin/r-salon/bycity-id/${c_id}`)
    .then(response => {
      if(!response.ok){
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      this.setState({ salonData: data });
    })
    .catch((error) => {
      throw new Error("Failed to fetch data");
    });
  };

  fetchsalondataasselectedcity = async (c_id) => {
    try {
      const response = await fetch(`/api/s-admin/r-salon/bycity-id/${c_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      this.setState({ salonData: data });
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  };

  render() {
    const { salonData, loading, error } = this.state;
    const { states, selectedstate, cities, selectedcity } = this.state;

    if (loading) {
      return <div>Loading...</div>; 
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <>
        <div className="filterdiv">
          <table className="filtertable">
            <tr>
              <td className="filtergender">
                <input
                  type="radio"
                  name="slgender"
                  value="All"
                  checked={this.state.FilterByGender === "All"}
                  onChange={() => this.AllSalonDataFetch()}
                />
                <label htmlFor="slgender">All</label>
                <input
                  type="radio"
                  name="slgender"
                  value="Both"
                  checked={this.state.FilterByGender === "Both"}
                  onChange={() => this.FilterByGender("Both")}
                />
                <label htmlFor="slgender">Both</label>
                <input
                  type="radio"
                  name="slgender"
                  value="Male"
                  checked={this.state.FilterByGender === "Male"}
                  onChange={() => this.FilterByGender("Male")}
                />
                <label htmlFor="slgender">Male</label>
                <input
                  type="radio"
                  name="slgender"
                  value="Female"
                  checked={this.state.FilterByGender === "Female"}
                  onChange={() => this.FilterByGender("Female")}
                />
                <label htmlFor="slgender">Female</label>
              </td>
              <td className="filtersearch">
                <div className="filtersearchdiv">
                  <input
                    className="serch-control"
                    id="sname"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    value={this.state.SalonName}
                    onChange={(e) =>
                      this.setState({ SalonName: e.target.value })
                    }
                  />
                  <button
                    className="search-button"
                    onClick={this.SearchSalonByName}
                  >
                    Search
                  </button>
                </div>
              </td>
              <td className="filteraddress">
                {/* <label>Filter by state</label> */}
                <select
                  value={selectedstate}
                  onChange={this.onstatechange}
                  className="filtersalonbystate"
                >
                  <option value="">Select a state</option>
                  {states.map((state) => (
                    <option key={state.state_id} value={state.state_id}>
                      {state.state_name}
                    </option>
                  ))}
                </select>

                {/* <label>Filter by City</label> */}
                <select
                  value={selectedcity}
                  onChange={this.oncitychange}
                  className="filtersalonbycity"
                >
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city.city_id} value={city.city_id}>
                      {city.city_name}
                    </option>
                  ))}
                </select>              
              </td>
            </tr>
          </table>
        </div>
        <div
          style={{
            padding: "1rem",
            margin: "0 5rem 5rem 5rem",
            border: "1px solid white",
            position: "relative",
            display: "flex",
            flexWrap: "wrap", // Changed flex-wrap to camelCase
          }}
        >
          {salonData.length > 0 ? (
            salonData.map((salon) => <Saloncart key={salon.id} salon={salon} />)
          ) : (
            <div className="nullsalondata">
              <h1 style={{fontWeight:'bolder'}}>No data found</h1>
            </div>
          )}
        </div>
      </>
    );
  }
}
