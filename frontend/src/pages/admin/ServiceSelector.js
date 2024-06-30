import React, { Component } from "react";
import "datatables.net-dt"; // Import DataTables library
import "datatables.net-dt/css/datatables.dataTables.css"; // Import DataTables CSS file
import $ from "jquery";
// import AuthContext from "../Context/AuthContext";
import axios from "axios";
import i1 from "./../../../static/media/images/asdad.png";

class ServiceSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      selectedService: "",
      categoryInput: "",
      salon_id: sessionStorage.getItem("salon_id"),
      users: [],
      service_id: "",
      category: this.handleInfo,
      typeofservice: this.handleInfo,
      img: this.handleInfo,
      duration: this.handleInfo,
      charge: this.handleInfo,
      categorys: [],
      categorystype: [],
      selectedcategory: "",
      selectedcategorytype: "",

    };
    this.tableRef = React.createRef();
    this.dataTableRef = React.createRef();
    // this.handleDelete = this.handleDelete.bind(this);
    // this.handleUpdate = this.handleUpdate.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.fetchcaategoryanditstypedata();
    // this.fetchUniqueId();
  }
  fetchUniqueId = async () => {
    try {
      const response = await fetch("/api/generate-unique-service-id/");
      const data = await response.json();
      this.setState({ service_id: data.service_id });
    } catch (error) {
      console.error("Error fetching unique service_id:", error);
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
    try {
      fetch(`/api/servicemastercategorytypesbycat/${selectedCategorys}/`)
        .then(response => response.json())
        .then(data => { this.setState({ categorystype: data });
        })
        .catch(error => console.error("categorystype data not fetched", error));
    } catch (error) {
      console.error("Error fetching categorystype data:", error);
    }
    console.log(this.state.categorystype);
  };
  oncategorytypechange = (event) => {
    this.setState({ selectedcategorytype: event.target.value }, () => {
      console.log("Selected selectedcategorytype:", this.state.selectedcategorytype);
    });
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

  handleCategoryChange = (event) => {
    this.setState({ categoryInput: event.target.value });
  };

  handleServiceChange = (event) => {
    this.setState({ selectedService: event.target.value });
  };

  async fetchData() {
    try {
      const response = await axios.get(
        `/api/s-admin/r-salon/service_master/
            ${this.state.salon_id}`
      );
      console.log(response.data);
      this.setState({ users: response.data });
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
  handleFileChange = (event, userId) => {
    const file = event.target.files[0];

    // Update the state with the selected file
    this.setState((prevState) => ({
      users: prevState.users.map((user) =>
        user.app_id === userId ? { ...user, img: file } : user
      ),
    }));
  };

  handelServiceMasterSubmit = async (e) => {
    const sr_id='';
    try {
      const response = await fetch("/api/generate-unique-service-id/");
      const data = await response.json();
      console.log(data);
      sr_id = data.service_id;
      // this.setState({ service_id: data.service_id });
    } catch (error) {
      console.error("Error fetching unique service_id:", error);
    }
    console.log(this.sr_id);
    // this.fetchUniqueId();
    const servicemaster = {
      service_id: this.sr_id,
      salon_id: this.state.salon_id,
      category: this.state.selectedcategory,
      typeofservice: this.state.selectedcategorytype,
      // img: this.state.img,
      duration: this.state.duration,
      charge: this.state.charge,
    };
    console.log(servicemaster);
    axios
      .post("/api/s-admin/r-salon/service_master/", servicemaster)
      .then((res) => {
        console.log(res.data);
        this.fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { services, selectedService, categoryInput } = this.state;
    const { users } = this.state;
    const { categorys, categorystype, selectedcategory, selectedcategorytype } = this.state;


    return (
      <div
        className="overflow-x-auto ml-[0rem] md:ml-[4rem] md:mr-[4rem] mr-0"
        style={{ position: "relative" }}
      >
        <h1>Service Details</h1>
        <div
          className="topbar"
          style={{ alignContent: "center", border: "1px solid black" }}
        >
          lets add some Appointment Details
        </div>
        <table
          ref={this.tableRef}
          className="table-auto min-w-full border border-gray-300"
        >
          <thead>
            <tr>
              <th className="px-4 py-2 border-gray-300">Service id</th>
              <th className="px-4 py-2 border-gray-300">Category</th>
              <th className="px-4 py-2 border-gray-300">TypeOfService</th>
              <th className="px-4 py-2 border-gray-300">Image</th>
              {/* <th className="px-4 py-2 border-gray-300">Duration</th> */}
              <th className="px-4 py-2 border-gray-300">Charge</th>
              <th className="px-4 py-2 border-gray-300">Actions</th>
            </tr>
          </thead>
          {/* fatched data display */}
          <tbody>
            {users.map((user) => (
              <tr key={user.service_id}>
                <td className="border px-4 py-2 border-gray-300">
                  <input
                    type="text"
                    value={user.service_id}
                    onChange={(e) =>
                      this.handleFieldChange(
                        user.service_id,
                        "service_id",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td className="border px-4 py-2 border-gray-300">
                  <input
                    type="text"
                    value={user.category}
                    onChange={(e) =>
                      this.handleFieldChange(
                        user.category,
                        "category",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td className="border px-4 py-2 border-gray-300">
                  <input
                    type="text"
                    value={user.typeofservice}
                    onChange={(e) =>
                      this.handleFieldChange(
                        user.typeofservice,
                        "typeofservice",
                        e.target.value
                      )
                    }
                  />
                </td>
                {/* <td className="border px-4 py-2 border-gray-300">
                  <td className="border px-4 py-2 border-gray-300">
                    <label
                      htmlFor={`file-input-${user.app_id}`}
                      className="cursor-pointer"
                    >
                      Upload Image
                    </label>
                    <input
                      type="file"
                      id={`file-input-${user.app_id}`}
                      style={{ display: "none" }}
                      onChange={(e) => this.handleFileChange(e, user.app_id)}
                    />
                    <input
                      type="text"
                      value={user.img}
                      readOnly
                      className="border px-2 py-1"
                    />
                    {user.img && (
                      <img
                        src={user.img}
                        alt="Selected Image"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    )}
                  </td>
                </td> */}
                <td className="border px-4 py-2 border-gray-300">
                  <input
                    type="text"
                    value={user.duration}
                    onChange={(e) =>
                      this.handleFieldChange(
                        user.duration,
                        "duration",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td className="border px-4 py-2 border-gray-300">
                  <input
                    type="text"
                    value={user.charge}
                    onChange={(e) =>
                      this.handleFieldChange(
                        user.charge,
                        "charge",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td className="border px-4 py-2 border-gray-300 flex justify-center">
                  <button
                    type="button"
                    style={{border: "1px solid black","background-color": "#4d4d4d"}}
                    className="bg-[#dc3545] text-white py-2 px-4 rounded-md hover:bg-[#b12929] mr-2"
                    onClick={() => this.handleDelete(user.service_id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    style={{border: "1px solid black","background-color": "#4d4d4d"}}
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
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th className="px-4 py-2 border-gray-300">Category</th>
              <th className="px-4 py-2 border-gray-300">Type Of Service</th>
              {/* <th className="px-4 py-2 border-gray-300">Image</th> */}
              <th className="px-4 py-2 border-gray-300">Duration</th>
              <th className="px-4 py-2 border-gray-300">Charge</th>
            </tr>
          </thead>
          {/* data insert */}
          <tbody>
            <tr>
              <td className="border px-4 py-2 border-gray-300">
                {/* <input
                  type="text"
                  required
                  onChange={(e) => this.handleInfo(e, "category")}
                /> */}
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

                  {/* <select
                    id="category"
                    name="category"
                    value={this.state.category}
                    onChange={(e) => this.handleInfo(e, "category")}
                    required
                  >
                    <option value="hair">Hair</option>
                    <option value="beard">Beard</option>
                    <option value="massage">Massage</option>
                    <option value="facials">Facials</option>
                  </select> */}
                </td>{" "}
              </td>
              <td className="border px-4 py-2 border-gray-300">
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
              {/*  <input
                  type="text"
                  required
                  onChange={(e) => this.handleInfo(e, "typeofservice")}
                /> */}
              </td>
              {/* <td className="border px-4 py-2 border-gray-300">
                <input
                  type="file"
                  required
                  onChange={(e) => this.handleInfo(e, "img")}
                />
              </td> */}
              <td className="border px-4 py-2 border-gray-300">
                <input
                  type="text"
                  required
                  onChange={(e) => this.handleInfo(e, "duration")}
                />
              </td>
              <td className="border px-4 py-2 border-gray-300">
                <input
                  type="text"
                  required
                  onChange={(e) => this.handleInfo(e, "charge")}
                />
              </td>
              <td className="border px-4 py-2 border-gray-300 flex justify-center">
                <button
                  type="button"
                  style={{border: "1px solid black","background-color": "#4d4d4d"}}
                  className="bg-[#dc3545] text-white py-2 px-4 rounded-md hover:bg-[#b12929] mr-2"
                  onClick={this.handelServiceMasterSubmit}
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

export default ServiceSelector;
