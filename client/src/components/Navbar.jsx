import React, { memo } from "react";
import userpic from "/userpic.svg";

import "./Navbar.css";
import Searchbar from "./Searchbar";
const Navbar = memo(() => {
  return (
    <div className="nav-bar">
      <h3 className="nav-title">Total Contacts</h3>
      
      <Searchbar />
      <div className="user-section">
        <div className="user-img">
          <img src={userpic} alt="user picture" />
        </div>
        <div className="username">
          <h6>Ram Darvin</h6>
          <p>Super Admin</p>
        </div>
      </div>
    </div>
  );
});

export default Navbar;
