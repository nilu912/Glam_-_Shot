import React, { Component } from "react";
import "datatables.net-dt"; // Import DataTables library
import "datatables.net-dt/css/datatables.dataTables.css"; // Import DataTables CSS file
import $ from "jquery";
// import AuthContext from "../Context/AuthContext";
import axios from "axios";
// import swal from 'sweetalert';

export default class ViewAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      services: [],
      salon_id: sessionStorage.getItem("salon_id"),
      service_id: [],
      selectedCategory: "",
      selectedTypeOfServices: [],
      uservice_id: '',
      app_id: '',
      date_of_appointment: this.handleInfo,
      date_of_book: this.handleInfo,
      start_time: this.handleInfo,
      end_time: this.handleInfo,
      total_amm: this.handleInfo,
      app_status: this.handleInfo,
      app_mode: this.handleInfo,
      categorys: [],
      categorystype: [],
      selectedcategory: "",
      selectedcategorytype: "",
      selectedcategory2: "",
      selectedcategorytype2: "",

    };
    this.tableRef = React.createRef();
    this.dataTableRef = React.createRef();
    // this.handleDelete = this.handleDelete.bind(this);
    // this.handleUpdate = this.handleUpdate.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleTypeOfServiceChange = this.handleTypeOfServiceChange.bind(this);
    this.fetchUniqueId();
    this.fetchcaategoryanditstypedata();
  }
  fetchUniqueId = async () => {
    try {
        const response = await fetch('/api/generate-unique-service-id/');
        const data = await response.json();
        this.setState({ uservice_id: data.service_id });
      } catch (error) {
        console.error('Error fetching unique service_id:', error);
      }
      try {
        const response = await fetch('/api/generate-unique-appointment-id/');
        const data = await response.json();
        console.log(data);
        this.setState({ app_id: data.appointment_id });
      } catch (error) {
        console.error('Error fetching unique app_id:', error);
      }
      };
  handleInfo = (e, fieldName) => {
    this.setState({
      [fieldName]: e.target.value,
    });
  };
  fetchcaategoryanditstypedata = async () => {
    try {
      const response = await fetch("/api/servicemastercategory/");
      const data = await response.json();
      console.log(data);
      this.setState({ categorys: data });
    } catch (error) {
      console.error((error) => console.error("categorys data not fatch", error));
    }
    try {
      const response = await fetch("/api/servicemastercategorytypes/");
      const data = await response.json();
      console.log(data);
      this.setState({ categorystype: data });
    } catch (error) {
      console.error((error) => console.error("categorytype data not fatch", error));
    }
  };

  // service category select
  oncategorychange = (event) => {
    const selectedCategorys = event.target.value;
    this.setState({ selectedcategory: selectedCategorys }, () => {
      console.log("Selected category:", this.state.selectedcategory);
    });
    this.setState({selectedcategory2: selectedCategorys});
    try {
      fetch(`/api/servicemastercategorytypes/${selectedCategorys}`)
        .then(response => response.json())
        .then(data => { this.setState({ categorystype: data });
        })
        .catch(error => console.error("categorystype data not fetched", error));
    } catch (error) {
      console.error("Error fetching categorystype data:", error);
    }
  };
  oncategorytypechange = (event) => {
    const selectedCategoryType = event.target.value;
    this.setState({ selectedcategorytype: selectedCategoryType }, () => {
      console.log("Selected selectedcategorytype:", this.state.selectedcategorytype);
    });
    this.setState({ selectedcategorytype2: selectedCategoryType });
  };
  
  handleFieldChange(userId, field, value) {
    // Update the state with the changed field value
    this.setState((prevState) => ({
      users: prevState.users.map((user) => {
        if (user.user_id === userId) {
          return { ...user, [field]: value }; // Update the specified field
        }
        return user;
      }),
    }));
  }
  // static contextType = AuthContext;

  componentDidMount() {
    this.fetchData();
    setTimeout(() => {
      if (this.tableRef.current && !this.dataTableRef.current) {
        this.dataTableRef.current = $(this.tableRef.current).DataTable({
          searching: true,
          paging: true,
          lengthMenu: [5, 10, 25, 50],
          language: {
            search: "Search:",
            lengthMenu: "Show MENU entries",
            info: "Showing START to END of TOTAL entries",
            paginate: {
              first: "First",
              last: "Last",
              next: "Next",
              previous: "Previous",
            },
          },
          stripeClasses: [], // Empty array to disable DataTables' default stripe classes
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    if (this.dataTableRef.current) {
      this.dataTableRef.current.destroy();
      this.dataTableRef.current = null;
    }
  }

  async fetchData() {
    try {
      const response = await axios.get(
        `/api/appointments/${this.state.salon_id}`
      );
      console.log(response.data);
      this.setState({ users: response.data });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    try {
      const response = await axios.get(
        `/api/s-admin/r-salon/service_master/
          ${this.state.salon_id}`
      );
      console.log(response.data);
      this.setState({ services: response.data });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  // async handleDelete(userId) {
  //     try {
  //         const { accessToken } = this.context;
  //         const headers = {
  //             Authorization: Bearer ${accessToken},
  //         };
  //         await axios.delete(${process.env.REACT_APP_SERVERURL}/user/delete/${userId}, { headers });
  //         this.setState(prevState => ({
  //             users: prevState.users.filter(user => user._id !== userId)
  //         }));
  //         swal("Deleted!", "Your imaginary file has been deleted!", "success");
  //     } catch (error) {
  //         console.error('Error deleting user:', error);
  //         swal({
  //             title: "Failed!",
  //             text: "Failed to delete user!",
  //             icon: "error",
  //             button: "Ok",
  //         });
  //     }
  // }

  async handleUpdate(userId, updatedUser) {
    try {
      const response = await axios.put(
        `/api/appointments-u/${userId}/`,
        updatedUser
      );
      const updatedUsers = this.state.users.map((user) =>
        user.app_id === userId ? response.data : user
      );
      this.setState({ users: updatedUsers });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  handleTypeOfServiceChange(e) {
    const selectedService = e.target.value;
    if (e.target.checked) {
      this.setState((prevState) => ({
        selectedTypeOfServices: [
          ...prevState.selectedTypeOfServices,
          selectedService,
        ],
      }));
    } else {
      this.setState((prevState) => ({
        selectedTypeOfServices: prevState.selectedTypeOfServices.filter(
          (service) => service !== selectedService
        ),
      }));
    }
  }
  handleInsertAppointment = async (e) => {
    const appointment = {
      app_id: this.state.app_id,
      salon_id: this.state.salon_id,
      user_id: this.state.user_id,
      date_of_appointment: this.state.date_of_appointment,
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      total_amm: this.state.total_amm,
      app_status : this.state.app_status,
      app_mode: this.state.app_mode,
    };
    console.log(appointment);
    try {
      const appointmentinfo = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          app_id: this.state.app_id,
          salon_id: this.state.salon_id,
          user_id: this.state.user_id,
          date_of_appointment: this.state.date_of_appointment,
          start_time: this.state.start_time,
          end_time: this.state.end_time,
          total_amm: this.state.total_amm,
          app_status : this.state.app_status,
          // app_mode: this.state.app_mode,
        }),
      };
      const appinforesponse = await fetch("/api/appointments/", appointmentinfo);
      const addressData = await appinforesponse.json();
      }
      catch{
        console.log(err);
      };

//     axios.post("/api/appointments/", appointment)
//    .then((res) => {
//         console.log(res.data);
//         this.fetchData();
//       })
//    .catch((err) => {
//         console.log(err);
//       });
  }

  selectedcategorytype2dataset = (category2, categorytype2) => {
    this.setState({
      selectedcategory2: category2,
      selectedcategorytype2: categorytype2,
    });
  };
    render() {
    const { users } = this.state;
    const { categorys, categorystype, selectedcategory, selectedcategorytype ,selectedcategory2,selectedcategorytype2} = this.state;

    return (
      <div
        className="overflow-x-auto ml-[0rem] md:ml-[4rem] md:mr-[4rem] mr-0"
        style={{ position: "relative" }}
      >
        <div style={{fontWeight:'bolder',fontSize:'2rem',display:'flex',justifyContent:'center'}}>Manage All Appointment</div>
        {/* <div
          className="topbar"
          style={{ alignContent: "center", border: "1px solid black" }}
        >
          lets add some Appointment Details
        </div> */}
        <table
          ref={this.tableRef}
          className="table-auto min-w-full border border-gray-300"
        >
          <thead>
            <tr>
              <th className="px-4 py-2 border-gray-300">Appointment Id</th>
              <th className="px-4 py-2 border-gray-300">User Id</th>
              <th className="px-4 py-2 border-gray-300">Date of book</th>
              <th className="px-4 py-2 border-gray-300">Date of appointment</th>
              <th className="px-4 py-2 border-gray-300">Start time</th>
              <th className="px-4 py-2 border-gray-300">End Time</th>
              <th className="px-4 py-2 border-gray-300">Tot duration</th>
              <th className="px-4 py-2 border-gray-300">Total amm</th>
              <th className="px-4 py-2 border-gray-300">Canceled</th>
              <th className="px-4 py-2 border-gray-300">
                Cancellation reasion
              </th>
              <th className="px-4 py-2 border-gray-300">Status</th>
              <th className="px-4 py-2 border-gray-300">Appointment Mode</th>
              <th className="px-4 py-2 border-gray-300">Actions</th>
            </tr>
          </thead>
          {/* fatched data display */}
          <tbody>
            {users.map((user) => (
              <tr key={user.app_id}>
                <td className="border px-4 py-2 border-gray-300">
                  <input
                    type="text"
                    value={user.app_id}
                    onChange={(e) =>
                      this.handleFieldChange(
                        user.app_id,
                        "app_id",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td className="border px-4 py-2 border-gray-300">
                  <input
                    type="text"
                    value={user.user_id}
                    onChange={(e) =>
                      this.handleFieldChange(
                        user.user_id,
                        "user_id",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td className="border px-4 py-2 border-gray-300">
                  <input
                    type="date"
                    value={user.date_of_book}
                    onChange={(e) =>
                      this.handleFieldChange(
                        user.user_id,
                        "date_of_book",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td className="border px-4 py-2 border-gray-300">
                  <input
                    type="date"
                    value={user.date_of_appointment}
                    onChange={(e) =>
                      this.handleFieldChange(
                        user.user_id,
                        "date_of_appointment",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td className="border px-4 py-2 border-gray-300">
                  <input
                    type="time"
                    value={user.start_time}
                    onChange={(e) =>
                      this.handleFieldChange(
                        user.user_id,
                        "start_time",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td className="border px-4 py-2 border-gray-300">
                  <input
                    type="time"
                    value={user.end_time}
                    onChange={(e) =>
                      this.handleFieldChange(
                        user.user_id,
                        "end_time",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td className="border px-4 py-2 border-gray-300">
                  <input
                    type="text"
                    value={user.tot_duration}
                    onChange={(e) =>
                      this.handleFieldChange(
                        user.user_id,
                        "tot_duration",
                        e.target.value
                      )
                    }
                    readOnly
                  />
                </td>
                <td className="border px-4 py-2 border-gray-300">
                  <input
                    type="text"
                    value={user.total_amm}
                    onChange={(e) =>
                      this.handleFieldChange(
                        user.user_id,
                        "total_amm",
                        e.target.value
                      )
                    }
                  />
                </td>             
                <td className="border px-4 py-2 border-gray-300">
                  <input
                    type="checkbox"
                    checked={user.canceled}
                    onChange={(e) =>
                      this.handleFieldChange(
                        user.user_id,
                        "canceled",
                        e.target.checked
                      )
                    }
                  />
                </td>
                <td className="border px-4 py-2 border-gray-300">
                  <input
                    type="text"
                    value={user.cancellation_reasion}
                    onChange={(e) =>
                      this.handleFieldChange(
                        user.user_id,
                        "cancellation_reasion",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td className="border px-4 py-2 border-gray-300">
                  <select
                    value={user.app_status}
                    style={{fontSize:'1rem'}}
                    onChange={(e) =>
                      this.handleFieldChange(
                        user.user_id,
                        "app_status",
                        e.target.value
                      )
                    }
                  >
                    <option value="complete">Complete</option>
                    <option value="pending">Pending</option>
                    <option value="canceled">Cenceled</option>
                  </select>
                </td>
                <td className="border px-4 py-2 border-gray-300">
                  <select
                    value={user.app_mode}
                    style={{fontSize:'1rem'}}
                    onChange={(e) =>
                      this.handleFieldChange(
                        user.user_id,
                        "app_mode",
                        e.target.value
                      )
                    }
                  >
                    <option value="salon">Salon</option>
                    <option value="home">Home</option>
                  </select>
                </td>
                <td className="border px-4 py-2 border-gray-300 flex justify-center">
                  <button
                    type="button"
                    style={{border: "1px solid black","background-color": "#4d4d4d"}}
                    className="bg-[#dc3545] text-white py-2 px-4 rounded-md hover:bg-[#b12929] mr-2"
                    onClick={() => this.handleDelete(user.user_id)}
                  >
                    Delete
                  </button>
                  <button
                    style={{border: "1px solid black","background-color": "#4d4d4d"}}
                    type="button"
                    className="bg-[#f1c02d] text-white py-2 px-4 rounded-md hover:bg-[#ffcc33] ml-2"
                    onClick={() => this.handleUpdate(user.app_id, user)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1 style={{ textAlign: "center" }}>Insert Data</h1>
        <table
          className="table-auto min-w-full border border-gray-300"
          topborder="1px solid black"
          style={{width:'100%'}}
        >
          <thead>
            <tr>
              <th className="px-4 py-2 border-gray-300">User Id</th>
              <th className="px-4 py-2 border-gray-300">Date of appointment</th>
              <th className="px-4 py-2 border-gray-300">Start time</th>
              <th className="px-4 py-2 border-gray-300">End Time</th>
              <th className="px-4 py-2 border-gray-300">Total amm</th>
              <th className="px-4 py-2 border-gray-300">Status</th>
              <th className="px-4 py-2 border-gray-300">Appointment Mode</th>
              <th className="px-4 py-2 border-gray-300">Select Services</th>
              <th className="px-4 py-2 border-gray-300">Type of services</th>
              <th className="px-4 py-2 border-gray-300">Actions</th>
            </tr>
          </thead>
          {/* data insert */}
          <tbody>
            <tr>
              <td className="border px-4 py-2 border-gray-300">
                <input type="text" 
                  required
                  onChange={(e) => this.handleInfo(e, "user_id")}
                />
              </td>
              <td className="border px-4 py-2 border-gray-300">
                <input type="date" 
                  required
                  onChange={(e) => this.handleInfo(e, "date_of_appointment")}
                />                
              </td>
              <td className="border px-4 py-2 border-gray-300">
                <input type="time"
                  required
                  onChange={(e) => this.handleInfo(e, "start_time")}
                />                
              </td>
              <td className="border px-4 py-2 border-gray-300">
                <input type="time" 
                  required
                  onChange={(e) => this.handleInfo(e, "end_time")}
                />                
              </td>
              <td className="border px-4 py-2 border-gray-300">
                <input type="text" 
                  required
                  onChange={(e) => this.handleInfo(e, "total_amm")}
                />                
              </td>
              <td className="border px-4 py-2 border-gray-300">
              <select
                  style={{fontSize:'1rem'}}
                  onChange={(e) => this.handleInfo(e, "app_status")}
                  >
                    <option value="complete" onChange={(e) => this.handleInfo(e, "app_status")}>Complete</option>
                    <option value="pending" onChange={(e) => this.handleInfo(e, "app_status")}>Pending</option>
                    <option value="canceled" onChange={(e) => this.handleInfo(e, "app_status")}>Cenceled</option>
                  </select>
              </td>
              <td className="border px-4 py-2 border-gray-300">
                <select
                   required
                   style={{fontSize:'1rem'}}
                  onChange={(e) => this.handleInfo(e, "app_mode")}
                >                
                  <option value="salon">Salon</option>
                  <option value="home">Home</option>
                </select>
              </td>
              <td className="border px-4 py-2 border-gray-300">
              <select
                  id="category"
                  value={selectedcategory}
                  name="category"
                  onChange={this.oncategorychange}
                  style={{fontSize:'1rem'}}
                >
                  <option value="">Select a Service Category</option>
                  {categorys.map((category) => (
                    <option key={category.categorys_id} value={category.categorys_id}>
                      {category.categorys}
                    </option>
                  ))}
                </select>

              </td>

              <td className="border px-4 py-2 border-gray-300" style={{width:"10%",}}>
              <select
                  id="category"
                  name="category"
                  value={selectedcategorytype}
                  onChange={this.oncategorytypechange}
                  style={{fontSize:'1rem'}}
                >
                  <option value="">Select a Category Type</option>
                  {categorystype.map((categorystype) => (
                    <option key={categorystype.category_types_id} value={categorystype.category_types_id}>
                      {categorystype.category_types}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border px-4 py-2 border-gray-300 flex justify-center">
                <button
                  style={{border: "1px solid black","background-color": "#4d4d4d"}}
                  type="button"
                  className="bg-[#dc3545] text-white py-2 px-4 rounded-md hover:bg-[#b12929] mr-2"
                  onClick={this.handleInsertAppointment}
                >
                  insert
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
