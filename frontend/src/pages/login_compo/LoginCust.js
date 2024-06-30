import React, { Component } from "react";
import { Link, Navigate} from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';
import './loginCss.css';
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
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


export default class LoginCust extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      password: '',
      shouldRedirect: false,
      show: false,

    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLogin = async (event) => {
    event.preventDefault();
    const { user_id, password } = this.state;
    try {
      const response = await axios.post(
        '/api/token/',
        { user_id, password }
      );
      const { access } = response.data;
      sessionStorage.setItem("user_id", user_id);
      localStorage.setItem('token', access);
      console.log( localStorage.getItem('token'));
      this.setState({ shouldRedirect: true });
    } catch (error) {
      alert("Login Credentials Not Found", error);
      console.error('Login failed:', error);
    }
  };
  handleClose = () => {
    this.setState({ show: false });
  };

  toggleShow = () => {
    this.setState((prevState) => ({
      show: !prevState.show,
    }));
  };

  handleSubmitbutton = async () => {
    
  }
  render() {
    const { user_id, password, shouldRedirect } = this.state;
    const { name, ...props } = this.props;
    const { show } = this.state;

    if (shouldRedirect == true) {
      return <Navigate to="/customer" />; // Redirect to home page after successful login
    }
      return (
      <>
        <div className="login-salon" >
          <div className="blur-background"></div>
          <div className="login-inner">
            <form onSubmit={this.handleLogin}>
              <h1>Login as a Customer</h1>
              <div className="input-box">
                <input type="text" name="user_id" placeholder="UserName" value={user_id} onChange={this.handleInputChange} required />
                <FaUser className="icon" />
              </div>
              <div className="input-box">
                <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleInputChange} required />
                <FaLock className="icon" />
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>
                <button onClick={this.toggleShow}>Forgot Password.?</button>
              </div>
              <div className="login-btn">
                <button className="logen-btn" type="submit">Login</button>
              </div>
              <div className="regeistration-link">
                <p>
                  Don't have an account.?<Link to="/c-reg">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <Offcanvas
            show={show}
            onHide={this.handleClose}
            {...props}
            style={{ width: "50rem", padding: "1rem" }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Forgot Your Password</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <MDBContainer>
                <MDBRow>
                  <MDBCol lg="8">
                    <MDBCard className="mb-4">
                      <MDBCardBody>
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Enter Your Email Id</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <input type="email" name="email" id="email" />
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3"></MDBCol>
                          <MDBCol sm="9">
                            <Button
                              variant="primary"
                              onClick={this.handleSubmitbutton}
                            >
                              Send Mail
                            </Button>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </Offcanvas.Body>
          </Offcanvas>
      </>
    );
  }
}
