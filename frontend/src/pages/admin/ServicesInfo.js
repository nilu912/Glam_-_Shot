import React, { Component } from 'react';
import 'datatables.net-dt'; // Import DataTables library
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS file
import $ from 'jquery';

class UserDataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            salon_id: sessionStorage.getItem('salon_id'),
        };
        this.tableRef = React.createRef();
        this.dataTableRef = React.createRef();
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
                        search: 'Search:',
                        lengthMenu: 'Show _MENU_ entries',
                        info: 'Showing _START_ to _END_ of _TOTAL_ entries',
                        paginate: {
                            first: 'First',
                            last: 'Last',
                            next: 'Next',
                            previous: 'Previous'
                        }
                    },
                    stripeClasses: [],
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
              `/api/s-admin/r-salon/service_master/
              ${this.state.salon_id}`
            );
            console.log(response.data);
            this.setState({ users: response.data });
          } catch (error) {
            console.error("Error fetching users:", error);
          }
    }

    render() {
        const { users } = this.state;
        return (
            <div className="overflow-x-auto ml-[0rem] md:ml-[4rem] md:mr-[4rem] mr-0">
                <table ref={this.tableRef} className="table-auto min-w-full border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-gray-300">First Name</th>
                            <th className="px-4 py-2 border-gray-300">Last Name</th>
                            <th className="px-4 py-2 border-gray-300">Email</th>
                            <th className="px-4 py-2 border-gray-300">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} >
                                <td className="border px-4 py-2 border-gray-300">{user.fname}</td>
                                <td className="border px-4 py-2 border-gray-300">{user.lname}</td>
                                <td className="border px-4 py-2 border-gray-300">{user.email}</td>
                                <td className="border px-4 py-2 border-gray-300">
                                    <button type="submit" className="bg-[#dc3545] text-white py-2 px-4 rounded-md hover:bg-[#b12929] mr-2">
                                        Delete
                                    </button>
                                    <button type="submit" className="bg-[#f1c02d] text-white py-2 px-4 rounded-md hover:bg-[#ffcc33] ml-2">
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

export default UserDataTable;
