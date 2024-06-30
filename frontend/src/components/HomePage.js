import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
    {
        path: "/home",
        element: <div>
          <RoomJoinPage />
          </div>,
    },
]);

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>

        <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
      </div>
    );
  }
}
