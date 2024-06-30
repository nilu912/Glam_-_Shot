// Saloncart.js
import React, { Component } from "react";
import "./Saloncart.css";
import { Link } from "react-router-dom";
import s1 from './../../../static/images/salon_imgs/s1.jpg';
import s2 from './../../../static/media/images/default.jpg';

class Saloncart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salonaddress: "",
      state_name: "",
      city_name: "",
      genderInfo: '',
      salon_img: '', // Initialize salon_img as null
    };
  }

  async componentDidMount() {
    this.updateData();
    }
    componentDidUpdate(prevProps) {
      if (prevProps.salon !== this.props.salon) {
        this.updateData();
      }
    }
    updateData = () =>{
      this.setState({});
      const { key, salon } = this.props;
      console.log(key);
      console.log("abc => "+salon.salon_address_id);
      this.setState({
        genderInfo: this.getGenderInfo(salon.cust_gender)
      });
  
      fetch(`/api/salonaddress/${salon.salon_address_id}/`)
        .then(response => {
          if (!response.ok) {throw new Error ("Error fetching");
        }
        return response.json();
      }).then((data) => {
        const addressdata = data;
        this.setState({salonaddress: addressdata.address});
  
        // pincode fetch 
        this.setState({pincode: addressdata.pincode});
  
            // state name fetch 
            fetch(`/api/state/${addressdata.state_id}`)
            .then(response => {
              if (!response.ok) {throw new Error ("Error fetching");
            }
              return response.json();
            }).then((data) => {
              this.setState({state_name: data.state_name});
            }).catch((error) => { throw new Error(error); });
  
            //city name fetch
            fetch(`/api/city/${addressdata.city_id}`)
              .then((response) => {
                if(!response.ok) throw new Error(error);
                return response.json();
              }).then((data) => {
                this.setState({city_name: data.city_name});
              }).catch((error) => {throw new Error(error)});
  
        // console.log(this.state.salonaddress, this.state.pincode, this.state.city_name,this.state.state_name);
      }).catch((error) => {
          console.error("Error fetching data:", error);
      });
    
        this.state.salon_img = s2;
      // Fetch salon image from API
      fetch(`/api/s-admin/r-salon/salon-media/${salon.salon_id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch salon image");
          }
          return response.json();
        })
        .then((data) => {
          if (data[0] !== null) {
            // Update salon_img state with the image URL
            this.setState({ salon_img: "./../../../"+data[0].image });
          } else {
            console.log("Default img");
          }
        })
        .catch((error) => {
          console.error("Error fetching salon image:", error);
        });
  
    }
  getGenderInfo = (custGender) => {
    if (custGender === 'Both') {
      return 'Male+Female';
    } else if (custGender === 'Female') {
      return 'Female';
    } else if (custGender === 'Male') {
      return 'Male';
    }
    return '';
  };

  handleClick = () => {
    sessionStorage.setItem("selectedSalonId", this.props.salon.salon_id);
  };

  render() {
    const { salon } = this.props;
    const { genderInfo, salon_img } = this.state;
    const defaultImgUrl = './../../../static/media/images/default.jpg';
  
    return (
      <Link to={`/selectedsalon`} key={salon.salon_id} onClick={this.handleClick}>
        <div className="card-container">
          <div className="image">
          {/* <img src={this.state.salon_img} alt="Salon Image" /> */}
            {salon_img ? (
              <img src={salon_img} alt="Salon Image" />
            ) : (
              <img src={defaultImgUrl} alt="Default Salon Image" />
            )}
          </div>
          <div className="second">
            <div className="title">{salon.salon_name}</div>
            <div className="genderinfo">{genderInfo}</div>
          </div>
          <div className="third">
            <div className="saloon-name" style={{fontSize:'1.2rem',}}>{this.state.salonaddress+", "+this.state.pincode+", "+this.state.city_name+", "+this.state.state_name}</div>
          </div>
        </div>
      </Link>
    );
  }
}

export default Saloncart;
