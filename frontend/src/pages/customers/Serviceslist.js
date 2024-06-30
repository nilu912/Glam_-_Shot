import React, { Component } from "react";
import { Form } from "react-bootstrap";
import "./AppointmentBooking.css";

class Serviceslist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      selectedServices: [],
    };
  }

  componentDidMount() {
    this.fetchServices();
  }

  fetchServices = async () => {
    const s_id = sessionStorage.getItem("selectedSalonId");
    try {
      // Fetch services
      const response = await fetch(
        `/api/s-admin/r-salon/service_master/${s_id}`
      );
      const servicesData = await response.json();
  
      // Fetch categories
      const categoriesResponse = await fetch('/api/servicemastercategory/');
      const categoriesData = await categoriesResponse.json();
  
      // Fetch types of services
      const typesOfServicesResponse = await fetch('/api/servicemastercategorytypes/');
      const typesOfServicesData = await typesOfServicesResponse.json();
  
      // Map services data to include category_name and typeofservice
      const servicesWithDetails = servicesData.map((service) => {
        const category = categoriesData.find(c => c.categorys_id === service.category);
        const typeOfService = typesOfServicesData.find(t => t.category_types_id === service.typeofservice);
        return {
          ...service,
          category_name: category ? category.categorys : 'Unknown',
          typeofservice: typeOfService ? typeOfService.category_types : 'Unknown',
        };
      });
      console.log(servicesWithDetails);
      this.setState({ services: servicesWithDetails });
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  
  // fetchServicescategorys = async () => {
  //   try {
  //     const response = await fetch(
  //       `/api/s-admin/r-salon/service_master/${s_id}`
  //     );
  //     const data = await response.json();
  //     // Convert image data to base64 and store it in the state
  //     const servicesWithBase64Image = data.map((service) => ({
  //       ...service,
  //       // imageData: `data:image/png;base64,${service.img}`,
  //     }));
  //     this.setState({ services: servicesWithBase64Image });
  //   } catch (error) {
  //     console.error("Error fetching services:", error);
  //   }
  // };

  dropDownShow = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  serviceChange = (event) => {
    const serviceId = parseInt(event.target.value);
    const isSelected = event.target.checked;
    const { selectedServices } = this.state;

    if (isSelected) {
      this.setState(
        { selectedServices: [...selectedServices, serviceId] },
        () => {
          // Update sessionStorage after state has been updated
          sessionStorage.setItem(
            "selectedServices",
            JSON.stringify(this.state.selectedServices)
          );
        }
      );
    } else {
      this.setState(
        { selectedServices: selectedServices.filter((id) => id !== serviceId) },
        () => {
          // Update sessionStorage after state has been updated
          sessionStorage.setItem(
            "selectedServices",
            JSON.stringify(this.state.selectedServices)
          );
        }
      );
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { selectedServices } = this.state;
    const app_id = sessionStorage.getItem("app_id");

    try {
      for (const serviceId of selectedServices) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            app_id: app_id,
            service_id: serviceId,
            // offer_id: null,
          }),
        };

        const response = await fetch(
          "/api/s-admin/r-salon/provided_services/",
          requestOptions
        );
        const responseData = await response.json();

        console.log(responseData);
      }
    } catch (error) {
      console.error("Error saving selected services:", error);
    }
  };

  calculateTotalDuration = () => {
    const { services, selectedServices } = this.state;
    let totalDurationSeconds = 0;

    selectedServices.forEach((serviceId) => {
      const service = services.find(
        (service) => service.service_id === serviceId
      );
      if (service) {
        const [hours, minutes, seconds] = service.duration
          .split(":")
          .map(Number);
        totalDurationSeconds += hours * 3600 + minutes * 60 + seconds;
      }
    });

    // Convert total duration to minutes and seconds
    const minutes = Math.floor(totalDurationSeconds / 60);
    const seconds = totalDurationSeconds % 60;

    // Format minutes and seconds to mm:ss format
    const formattedDuration = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;

    // Pass the formatted duration to the parent component
    this.props.onCalcTotDuration(formattedDuration);
    // console.log(formattedDuration);
    // Return the formatted duration
    return formattedDuration;
  };

  calculateTotalCharge = () => {
    const { services, selectedServices } = this.state;
    let totalCharge = 0;
    selectedServices.forEach((serviceId) => {
      const service = services.find(
        (service) => service.service_id === serviceId
      );
      if (service) {
        totalCharge += service.charge;
      }
    });
    const cacTotCharge = totalCharge.toFixed(2);
    this.props.onCalcTotCharge(cacTotCharge);
    return totalCharge.toFixed(2);
  };
  render() {
    const { services, selectedServices, isOpen } = this.state;

    return (
      <div className="selectservicesclass">
        {/* <div className="d-flex justify-content-center"> */}
        <div className="custom-dropdown">
          <u><h2>Select Service</h2></u>
          <div
            className={`custom-dropdown-menu ${isOpen ? "show" : ""}`}
            style={{ color: "white", fontSize: "1.5rem" }}
          >
            {services.map((service) => (
              <Form.Check
                className="custom-checkbox"
                key={service.service_id}
                style={{ color: "white" }}
                type="checkbox"
                id={`service_${service.service_id}`}
                label={`${service.category_name} - ${service.typeofservice} (${service.duration}, $${service.charge})`}
                checked={selectedServices.includes(service.service_id)}
                onChange={this.serviceChange}
                value={service.service_id}
              />
            ))}
          </div>
        </div>

        <div className="custom-dropdown-second">
          <u><h2>Selected Services</h2></u>
          <ul>
            {selectedServices.map((serviceId) => (
              <li key={serviceId}>
                {
                  services.find((service) => service.service_id === serviceId)
                    ?.category_name
                }{" "}
                -{" "}
                {
                  services.find((service) => service.service_id === serviceId)
                    ?.typeofservice
                }{" "}
                (
                {
                  services.find((service) => service.service_id === serviceId)
                    ?.duration
                }
                , $
                {
                  services.find((service) => service.service_id === serviceId)
                    ?.charge
                }
                )
              </li>
            ))}
          </ul>
          <div className="totselectedserviceinfo">
            <div className="totdurationdis">
              <strong>Total Duration:</strong> {this.calculateTotalDuration()}{" "}
              minutes
            </div>
            <div className="totchargedis">
              <strong>Total Charge:</strong> ₹{this.calculateTotalCharge()}
            </div>
          </div>
          {/* <button onClick={this.handleSubmit}>Submit</button> */}
        </div>
        {/* </div> */}
      </div>
    );
  }
}

export default Serviceslist;
