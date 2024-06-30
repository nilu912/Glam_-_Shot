import React, { Component } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

export default class Menu extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Glam & Shot</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Services</Link>
          </li>
          <li>
            <Link to="/">Who us.?</Link>
          </li>
        </ul>
      </div>
    );
  }
}
