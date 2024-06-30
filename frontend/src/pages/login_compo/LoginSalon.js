import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom"; // Import Navigate
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios"; // Import axios
// import jwtDecode from "jwt-decode";

export default class LoginSalon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      password: "",
      shouldRedirect: false,
    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLogin = async (event) => {
    event.preventDefault();
    const { user_id, password } = this.state;
    try {
      const response = await axios.post("/api/token/", { user_id, password });
      const { access } = response.data;
      localStorage.setItem("token", access);
      console.log(localStorage.getItem("token"));
      const token = localStorage.getItem("token");
      // const decodedToken = jwtDecode(token);
      // console.log(decodedToken); 
      this.setState({ shouldRedirect: true });
    } catch (error) {
      alert("Login Credentials Not Found", error);
      console.error("Login failed:", error);
    }
  };

  render() {
    const { user_id, password,shouldRedirect } = this.state;
    if (shouldRedirect == true) {
      return <Navigate to="/admin" />; // Redirect to home page after successful login
    }

    return (
      <>
        <div className="login-salon">
          <div className="blur-background"></div>
          <div className="login-inner">
            <form onSubmit={this.handleLogin}>
              <h1>Login as a owner</h1>
              <div className="input-box">
                <input
                  type="text"
                  name="user_id" 
                  placeholder="UserName"
                  value={user_id}
                  onChange={this.handleInputChange}
                  required
                />
                <FaUser className="icon" />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  name="password" 
                  placeholder="Password"
                  value={password}
                  onChange={this.handleInputChange}
                  required
                />
                <FaLock className="icon" />
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>
                <Link to="/">Forgot Password.?</Link>
              </div>
              <div className="login-btn">
                <button className="logen-btn" type="submit">Login</button>
              </div>
              <div className="regeistration-link">
                <p>
                  Don't have an account.?<Link to="/s-reg">Register</Link>
                </p>
              </div>
            </form>
            {/* {this.state.shouldRedirect ? (
           <Navigate replace to="/admin" />
       ) : null} */}
          </div>
        </div>
      </>
    );
  }
}
