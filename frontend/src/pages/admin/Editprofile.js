import React, { Component } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import "./Editprofile.css";
import img from "./../../../static/media/images/default.jpg";
import Button from "react-bootstrap/Button";

class Editprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      salons: [],
      admin: [],
      p_id: null,
      user_address_id: "",
      first_name: "",
      last_name: "",
      dob: "",
      gender: "",
      mob: "",
      email: "",
      address: "",
      user_address_id: "",
      u_address: "",
      u_pincode: "",
      u_city: "",
      u_state: "",
      salon_address_id: "",
      s_address: "",
      s_pincode: "",
      s_city: "",
      s_state: "",
      admin_id: "",
      salon_id: "",
      salon_name: "",
      cust_gender: "",
      salon_address_id: "",
      image: "",
      img_id: '',
      states: [],
      u_cities: [],
      states: [],
      s_cities: [],
      u_selectedstate: "",
      s_selectedstate: "",
      u_selectedcity: "",
      s_selectedcity: "",
      selectedFile: null,
      imageUrl: null,
      uploadStatus: "",
      // p_id: this.fetchUniqueId,
      val: false,
    };
    // this.fetchstateandcitydata();
    // this.alldatafetch();
    this.fetchUniqueId();
  }
  componentDidMount() {
    this.fetchstateandcitydata();
    this.alldatafetch();
    this.salonimagefetch();
  }
  fetchUniqueId = async () => {
    try {
        const response = await fetch('/api/generate-unique-img-id/');
        const data = await response.json();
        this.setState({ img_id: data.user_img_id });
      } catch (error) {
        console.error('Error fetching unique service_id:', error);
      }
  };

  fetchstateandcitydata = async () => {
    try {
      const response = await fetch("/api/state/");
      const data = await response.json();
      this.setState({ states: data });
    } catch (error) {
      console.error((error) => console.error("States data not fatch", error));
    }
    try {
      const response = await fetch("/api/city/");
      const data = await response.json();
      this.setState({ u_cities: data, s_cities: data });
    } catch (error) {
      console.error((error) => console.error("Citiy data not fatch", error));
    }
  };

  onstatechange = (event) => {
    if (event.target.name === "u_state") {
      const selectedState = event.target.value;
      this.setState(
        { u_state: selectedState, u_selectedstate: event.target.value },
        () => {
          console.log("Selected state:", this.state.u_state);
        }
      );
      try {
        fetch(`/api/city/bystate/${selectedState}`)
          .then((response) => response.json())
          .then((data) => {
            // console.log("s_city",data[0].city_id);
            this.setState({ u_cities: data, u_city: data[0].city_id });
          })
          .catch((error) => console.error("City data not fetched", error));
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    } else if (event.target.name === "s_state") {
      const selectedState = event.target.value;
      this.setState(
        { s_state: selectedState, s_selectedstate: event.target.value },
        () => {
          console.log("Selected state:", this.state.s_state);
        }
      );
      try {
        fetch(`/api/city/bystate/${selectedState}`)
          .then((response) => response.json())
          .then((data) => {
            this.setState({ s_cities: data, s_city: data[0].city_id });
          })
          .catch((error) => console.error("City data not fetched", error));
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    }
  };

  oncitychange = (event) => {
    if (event.target.name === "u_city") {
      this.setState({ u_city: event.target.value }, () => {
        console.log("Selected city:", this.state.u_city);
      });
    } else if (event.target.name === "s_city") {
      this.setState({ s_city: event.target.value }, () => {
        console.log("Selected city:", this.state.s_city);
      });
    }
  };

  alldatafetch = async () => {
    const salon_id = sessionStorage.getItem("salon_id");
    // console.log("s_id1",salon_id);
    this.setState({ salon_id: sessionStorage.getItem("salon_id") });
    // console.log("s_id1 by sttar",this.state.salon_id);
    try {
      const response = await fetch(`/api/s-admin/r-salon/${salon_id}`);
      const salondata = await response.json();
      console.log(salondata);
      try {
        const response = await fetch(`/api/s-admin/${salondata.admin_id}`);
        const admindata = await response.json();
        // console.log(admindata);
        // this.setState({ p_id: admindata.p_id });
        // console.log('p_id ',admindata.p_id);
        try {
          const response = await fetch(`/api/profiles/${admindata.p_id}`);
          const data = await response.json();
          this.setState({
            users: data,
            p_id: data.p_id,
            user_address_id: data.user_address_id,
            first_name: data.first_name,
            last_name: data.last_name,
            dob: data.dob,
            gender: data.gender,
            mob: data.mob,
            email: data.email,
            user_address_id: data.user_address_id,
          });
        } catch (error) {
          console.error((error) =>
            console.error("personal data not fatch", error)
          );
        }
        this.setState({ admin: admindata, admin_id: admindata.admin_id });
      } catch (error) {
        console.error((error) => console.error("admin data not fatch", error));
      }
      this.setState({
        admin_id: salondata.admin_id,
        salons: salondata,
        salon_name: salondata.salon_name,
        cust_gender: salondata.cust_gender,
        salon_address_id: salondata.salon_address_id,
      });
    } catch (error) {
      console.error((error) => console.error("Salon data not fatch", error));
    }
    this.fetchaddressdataforuserandsalon();
    this.salonimagefetch();
  };
  fetchaddressdataforuserandsalon = async () => {
    // User address data fetch
    try {
      const response = await fetch(
        `/api/useraddress/${this.state.user_address_id}`
      );
      const useradd = await response.json();
      // try {
      //   const response = await fetch(`/api/city/${useradd.city_id}`);
      //   const usercity = await response.json();
      //   this.setState({ u_city: usercity.city_name });
      // } catch (error) {
      //   console.error((error) =>
      //     console.error("user city address data not fatch", error)
      //   );
      // }
      // try {
      //   const response = await fetch(`/api/state/${useradd.state_id}`);
      //   const userstate = await response.json();
      //   this.setState({ u_state: userstate.state_name });
      // } catch (error) {
      //   console.error((error) =>
      //     console.error("user city address data not fatch", error)
      //   );
      // }

      this.setState({
        u_address: useradd.address,
        u_pincode: useradd.pincode,
        u_state: useradd.state_id,
        u_city: useradd.city_id,
      });
    } catch (error) {
      console.error((error) =>
        console.error("personal address data not fatch", error)
      );
    }

    // Salon address data fetch
    try {
      const response = await fetch(
        `/api/salonaddress/${this.state.salon_address_id}`
      );
      const salonadd = await response.json();
      // console.log(salonadd);
      // try {
      //   const response = await fetch(`/api/city/${salonadd.city_id}`);
      //   const usercity = await response.json();
      //   this.setState({ s_city: usercity.city_name });
      // } catch (error) {
      //   console.error((error) =>
      //     console.error("salon city address data not fatch", error)
      //   );
      // }
      // try {
      //   const response = await fetch(`/api/state/${salonadd.state_id}`);
      //   const salonstate = await response.json();
      //   this.setState({ s_state: salonstate.state_name });
      // } catch (error) {
      //   console.error((error) =>
      //     console.error("salon state address data not fatch", error)
      //   );
      // }

      this.setState({
        s_address: salonadd.address,
        s_pincode: salonadd.pincode,
        s_state: salonadd.state_id,
        s_city: salonadd.city_id,
      });
    } catch (error) {
      console.error((error) =>
        console.error("salon address data not fatch", error)
      );
    }
  };
  salonimagefetch = async () => {
    this.state.image = img;
    try {
      fetch(`/api/s-admin/r-salon/salon-media/${this.state.salon_id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data[0] !== null) {
            // Update image state with the image URL
            // console.log(data[0].image);
            this.setState({ image: "./../../../" + data[0].image });
          } else {
            console.log("Default img");
          }

          // this.setState({ s_cities: data, s_city: data[0].city_id,});
        })
        .catch((error) => console.error("salon Image  not fetched", error));
    } catch (error) {
      console.error("Error fetching salon Image :", error);
    }
  };
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFileChange = (e) => {
    this.setState({
      // image: e.target.files[0],
      selectedFile: e.target.files[0],
      imageUrl: URL.createObjectURL(e.target.files[0]),
    });
  };

  salondataupdate = async () => {
    // salon info update
    try {
      const Salon_info = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salon_name: this.state.salon_name,
          cust_gender: this.state.cust_gender,
        }),
      };
      const saloninforesponse = await fetch(
        `/api/s-admin/r-salonupdate/${this.state.salon_id}`,
        Salon_info
      );
      const salonData = await saloninforesponse.json();
      console.log(salonData);
    } catch {
      console.log("not salon data update");
    }
    // salon address update
    try {
      const SalonAddress_info = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: this.state.s_address,
          pincode: this.state.s_pincode,
          city_id: this.state.s_city,
          state_id: this.state.s_state,
        }),
      };
      const salonaddinforesponse = await fetch(
        `/api/salonaddressupdate/${this.state.salon_address_id}/`,
        SalonAddress_info
      );
      const salonaddData = await salonaddinforesponse.json();
      console.log(salonaddData);
    } catch {
      console.log("not salon address data update");
    }
  };

  handlePrsonalInfoUpdate = async () => {
    // useraddress update
    try {
      const User_info = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          dob: this.state.dob,
          gender: this.state.gender,
          mob: this.state.mob,
          email: this.state.email,
        }),
      };
      const userinforesponse = await fetch(
        `/api/profilesupdate/${this.state.p_id}`,
        User_info
      );
      const userData = await userinforesponse.json();
      console.log(userData);
    } catch {
      console.log("not salon data update");
    }
    // user address update
    try {
      const UserAddress_info = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: this.state.u_address,
          pincode: this.state.u_pincode,
          city_id: this.state.u_city,
          state_id: this.state.u_state,
        }),
      };
      const useraddinforesponse = await fetch(
        `/api/useraddressupdate/${this.state.user_address_id}/`,
        UserAddress_info
      );
      if (!useraddinforesponse.ok) {
        throw new Error(`HTTP error! Status: ${useraddinforesponse.status}`);
      }
      const useraddData = await useraddinforesponse.json();
      console.log(useraddData);
    } catch {
      console.log("not user address data update");
    }
  };

  salonimagechange = async () => {
    console.log("data = ");
    try {
      const response = await fetch(`/api/s-admin/r-salon/salon-media/${this.state.salon_id}`);
      const salonmdata = await response.json();
      console.log(salonmdata[0] === null);
      if (salonmdata[0] !== null) {
        const formData = new FormData();
        formData.append("image", this.state.selectedFile);
  
        const response = await fetch(
          `/api/s-admin/r-salon/salon-media-imgchange/${this.state.salon_id}/`,
          {
            method: "PUT",
            body: formData,
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          this.setState({
            image: URL.createObjectURL(this.state.selectedFile),
            uploadStatus: "Image uploaded successfully",
          });
        } else {
          this.setState({ uploadStatus: "Failed to upload image" });
        }
      } else {
        console.log("img",this.state.img_id,'salon',this.state.salon_id,this.state.category);
        const formData = new FormData();
        formData.append("img_id", this.state.img_id);
        formData.append("salon_id", this.state.salon_id);
        formData.append("category", this.state.category);
        formData.append("image", this.state.selectedFile);
        console.log(formData);
        const response = await fetch(
          '/api/s-admin/r-salon/salon-media/',
          {
            method: "POST",
            body: formData,
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          this.setState({
            image: URL.createObjectURL(this.state.selectedFile),
            uploadStatus: "Image uploaded successfully",
          });
        } else {
          this.setState({ uploadStatus: "Failed to upload image" });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      this.setState({ uploadStatus: "Error uploading image" });
    }
  };
  
  render() {
    const { states, u_cities, s_cities, image } = this.state;

    return (
      <section style={{ backgroundColor: "#eee", width: "100%" }}>
        <div className="mainprofdiv">
          <MDBContainer className="py-5">
            <h1>Personal Information</h1>
            <div className="first-div-for-prf-edit">
              <MDBRow>
                <MDBCol lg="8">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>p_id</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          {/* <MDBCardText className="text-muted">Johnatan Smith</MDBCardText> */}
                          <input
                            className="edpinput"
                            type="text"
                            name="p_id"
                            value={this.state.p_id}
                            id="p_id"
                            onChange={this.handleInputChange}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>First Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          {/* <MDBCardText className="text-muted">Johnatan Smith</MDBCardText> */}
                          <input
                            className="edpinput"
                            type="text"
                            name="first_name"
                            value={this.state.first_name}
                            id="first_name"
                            onChange={this.handleInputChange}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Last Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <input
                            className="edpinput"
                            type="text"
                            name="last_name"
                            id="last_name"
                            value={this.state.last_name}
                            onChange={this.handleInputChange}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Date Of Birth</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <input
                            className="edpinput"
                            type="date"
                            name="dob"
                            id="dob"
                            value={this.state.dob}
                            onChange={this.handleInputChange}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Gender</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          {/* <input
                            className="edpinput"
                            type="text"
                            name="gender"
                            id="gender"
                            value={this.state.gender}
                            onChange={this.handleInputChange}
                          /> */}
                          <select
                            name="gender"
                            value={this.state.gender}
                            onChange={this.handleInputChange}
                          >
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                          </select>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Mobile</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <input
                            className="edpinput"
                            type="number"
                            name="mob"
                            id="mob"
                            value={this.state.mob}
                            onChange={this.handleInputChange}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Email</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <input
                            className="edpinput"
                            type="email"
                            name="email"
                            id="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Address</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <input
                            className="edpinput"
                            type="text"
                            name="u_address"
                            id="u_address"
                            value={this.state.u_address}
                            onChange={this.handleInputChange}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Pincode</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <input
                            className="edpinput"
                            type="number"
                            name="u_pincode"
                            id="u_pincode"
                            value={this.state.u_pincode}
                            onChange={this.handleInputChange}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>City</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          {/* <input
                            className="edpinput"
                            type="text"
                            name="city"
                            id="city"
                            value={this.state.u_city}
                            onChange={this.handleInputChange}
                          /> */}
                          <select
                            name="u_city"
                            value={this.state.u_city}
                            onChange={this.oncitychange}
                            className="select_state_value"
                          >
                            {u_cities.map((city) => (
                              <option key={city.city_id} value={city.city_id}>
                                {city.city_name}
                              </option>
                            ))}
                          </select>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>State</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          {/* <input
                            className="edpinput"
                            type="text"
                            name="state"
                            id="steta"
                            value={this.state.u_state}
                            onChange={this.handleInputChange}
                          /> */}
                          <select
                            name="u_state"
                            value={this.state.u_state}
                            onChange={this.onstatechange}
                            className="select_citys_value"
                          >
                            {states.map((state) => (
                              <option
                                key={state.state_id}
                                value={state.state_id}
                              >
                                {state.state_name}
                              </option>
                            ))}
                          </select>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3"></MDBCol>
                        <MDBCol sm="9">
                          {/* <button style={{backgroundColor:''}} onClick={this.handlePrsonalInfoUpdate}>Submit Data</button> */}
                          <Button
                            variant="primary"
                            style={{ width: "10rem", fontSize: "1.3rem" }}
                            onClick={this.handlePrsonalInfoUpdate}
                          >
                            Submit Data
                          </Button>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </div>
            <div >
              <h1 style={{ marginTop: "3rem" }}>Salon Information</h1>
              <div className="third-div-for-prf-edit">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src={image}
                      alt="Salon Image"
                      // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      // alt="avatar"
                      // className="rounded-circle"
                      style={{ width: "40rem" }}
                      fluid
                    />
                    <p className="text-muted mb-4">Salon Profile Photo</p>
                    <div className="second-inner-div-for-prf-edit d-flex justify-content-center mb-2">
                      <input
                        type="file"
                        name="image"
                        onChange={this.handleFileChange}
                      />
                      <Button
                        variant="primary"
                        style={{ width: "10rem", fontSize: "1.3rem" }}
                        onClick={this.salonimagechange}
                      >
                        Change
                      </Button>
                      {/* <MDBBtn onClick={this.salonimagechange}>Change</MDBBtn> */}
                    </div>
                  </MDBCardBody>
                </MDBCard>
                <MDBRow>
                  <MDBCol lg="8">
                    <MDBCard className="mb-4">
                      <MDBCardBody>
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>salon_id</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            {/* <MDBCardText className="text-muted">Johnatan Smith</MDBCardText> */}
                            <input
                              className="edpinput"
                              type="text"
                              name="salon_id"
                              id="salon_id"
                              value={this.state.salon_id}
                              onChange={this.handleInputChange}
                            />
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Salon Name</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            {/* <MDBCardText className="text-muted">Johnatan Smith</MDBCardText> */}
                            <input
                              className="edpinput"
                              type="text"
                              name="salon_name"
                              id="salon_name"
                              value={this.state.salon_name}
                              onChange={this.handleInputChange}
                            />
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Customer Gender</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            {/* <input
                            className="edpinput"
                            type="text"
                            name="cust_gender"
                            id="cust_gender"
                            value={this.state.cust_gender}
                            onChange={this.handleInputChange}
                          /> */}
                            <select
                              name="cust_gender"
                              value={this.state.cust_gender}
                              onChange={this.handleInputChange}
                            >
                              <option value="Both">Both</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Address</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <input
                              className="edpinput"
                              type="text"
                              name="s_address"
                              id="s_address"
                              value={this.state.s_address}
                              onChange={this.handleInputChange}
                            />
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Pincode</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <input
                              className="edpinput"
                              type="number"
                              name="s_pincode"
                              id="s_pincode"
                              value={this.state.s_pincode}
                              onChange={this.handleInputChange}
                            />
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>City</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            {/* <input
                            className="edpinput"
                            type="text"
                            name="city"
                            id="city"
                            value={this.state.s_city}
                            onChange={this.handleInputChange}
                          /> */}
                            <select
                              name="s_city"
                              value={this.state.s_city}
                              onChange={this.oncitychange}
                              className="select_state_value"
                            >
                              {s_cities.map((city) => (
                                <option key={city.city_id} value={city.city_id}>
                                  {city.city_name}
                                </option>
                              ))}
                            </select>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>State</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            {/* <input
                            className="edpinput"
                            type="text"
                            name="state"
                            id="state"
                            value={this.state.s_state}
                            onChange={this.handleInputChange}
                          /> */}
                            <select
                              name="s_state"
                              value={this.state.s_state}
                              onChange={this.onstatechange}
                              className="select_citys_value"
                            >
                              {states.map((state) => (
                                <option
                                  key={state.state_id}
                                  value={state.state_id}
                                >
                                  {state.state_name}
                                </option>
                              ))}
                            </select>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3"></MDBCol>
                          <MDBCol sm="9">
                            <Button
                              variant="primary"
                              style={{ width: "10rem", fontSize: "1.3rem" }}
                              onClick={this.salondataupdate}
                            >
                              Submit Data
                            </Button>
                            {/* <button onClick={this.salondataupdate}>
                            Submit Data
                          </button> */}
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </div>
            </div>
          </MDBContainer>
        </div>
      </section>
    );
  }
}

export default Editprofile;
