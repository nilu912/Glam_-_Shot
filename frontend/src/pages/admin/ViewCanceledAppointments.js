import React, { Component } from "react";
import "datatables.net-dt"; // Import DataTables library
import "datatables.net-dt/css/datatables.dataTables.css"; // Import DataTables CSS file
import $ from "jquery";
// import AuthContext from "../Context/AuthContext";
import axios from "axios";
// import swal from 'sweetalert';

export default class ViewCanceledAppointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            salon_id: sessionStorage.getItem("salon_id"),
        };
        this.tableRef = React.createRef();
        this.dataTableRef = React.createRef();
        // this.handleDelete = this.handleDelete.bind(this);
        // this.handleUpdate = this.handleUpdate.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    handleFieldChange(userId, field, value) {
        // Update the state with the changed field value
        this.setState(prevState => ({
            users: prevState.users.map(user => {
                if (user.user_id === userId) {
                    return { ...user, [field]: value }; // Update the specified field
                }
                return user;
            })
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
                        search: 'Search:',
                        lengthMenu: 'Show MENU entries',
                        info: 'Showing START to END of TOTAL entries',
                        paginate: {
                            first: 'First',
                            last: 'Last',
                            next: 'Next',
                            previous: 'Previous'
                        }
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
            const response = await axios.get(`/api/appointments/canceled/${this.state.salon_id}`);
            console.log(response.data);
            this.setState({ users: response.data });
        } catch (error) {
            console.error('Error fetching users:', error);
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

  // async handleUpdate(userId, updatedUser) {
  //     try {
  //         const response = await axios.put(`/api/customers-u/${userId}/`, updatedUser);
  //         // If the request is successful, update the state with the updated user data
  //         const updatedUsers = this.state.users.map(user => user.user_id === userId ? response.data : user);
  //         this.setState({ users: updatedUsers });
  //     } catch (error) {
  //         // Handle errors appropriately
  //         console.error('Error updating user:', error);
  //     }
  // }
  render() {
    const { users } = this.state;

    return (
      <div className="overflow-x-auto ml-[0rem] md:ml-[4rem] md:mr-[4rem] mr-0">
        <div style={{fontWeight:'bolder',fontSize:'2rem',display:'flex',justifyContent:'center'}}>View All Candeled Appointment</div>
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
      </div>
    );
  }
}
