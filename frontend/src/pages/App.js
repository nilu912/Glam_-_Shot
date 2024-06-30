import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
// import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Aboutus from "./components/Aboutus";
import TermsAndConditions from "./components/TermsAndConditions";
import Adminnav from "./admin/adminnav";
import LoginSalon from "./login_compo/LoginSalon";
import LoginCust from "./login_compo/LoginCust";
import RegSalon from "./login_compo/RegSalon";
import RegCust from "./login_compo/RegCust";
import Adminhome from "./admin/Adminhome";
import Customerhome from "./customers/Customerhome";
import Selectedsalon from "./customers/Selectedsalon";
import Herosection from "./components/herosection";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import ServiceSelector from "./admin/ServiceSelector";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Herosection />
        {/* <ServiceInfo /> */}
        {/* <HomePage /> */}
        <Footer />
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        <Navbar />
        <Aboutus />
        <Footer />
      </>
    ),
  },
  {
    path: "/termsandconditions",
    element: (
      <>
        <Navbar />
        <TermsAndConditions />
        <Footer />
      </>
    ),
  },
  {
    path: "/s-login",
    element: (
      <>
      <LoginSalon />
      </>
    ),
  },
  {
    path: "/c-login",
    element: (
      <>
      <LoginCust />
      </>
    ),
  },
  {
    path: "/s-reg",
    element: (
      <>
        <RegSalon />
      </>
    ),
  },
  {
    path: "/c-reg",
    element: (
      <>
        <RegCust />
      </>
    ),
  },
  {
    path: "/admin",
    element: (
      <>
        {/* <Navbar /> */}
        <Adminnav />
        {/* <Admin_homepage /> */}
        <Adminhome />
        <Footer />
      </>
    ),
  },
  {
    path: "/customer",
    element: (
      <>
        <Customerhome />
        {/* <Navbar /> */}
        {/* <Custnav /> */}
      </>
    ),
  },
  {
    path: "/Selectedsalon",
    element: (
      <>
        <Selectedsalon />
      </>
    ),
  },
]);

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>     
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </>
    );
  }
}

const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
