import React, { memo } from "react";
import userpic from "/userpic.svg";
import searchIcon from "/searchicon.svg";
import "./Navbar.css";
const Navbar = memo(() => {
  return (
    <div className="nav-bar">
      <h3 className="nav-title">Total Contacts</h3>
      <div className="nav-input-area">
        <input
          type="text"
          id="nav-input"
          placeholder="Search by Email Id....."
        />
        <img src={searchIcon} alt="search icon image" />
      </div>

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
