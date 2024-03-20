import React, { memo } from "react";
import "./Aside.css";
import dashboardicon from "/dashboardicon.svg";
import contactsicon from "/contactsicon.svg";
import logout from "/logout.svg";
import { useNavigate } from "react-router-dom";

const Aside = memo(function Aside() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("jwt");
    navigate("/");
  }
  return (
    <div className="aside">
      <h3>Logo</h3>
      <div className="tabs">
        <div className="dashboard-block">
          <img src={dashboardicon} alt="dashboardicon" />
          <input type="button" value="Dashboard" id="dashboard-toggle" />
        </div>

        <div className="contacts-block">
          <img src={contactsicon} alt="contactsicon" />
          <input
            type="button"
            value="Total contacts"
            id="total-contacts-toggle"
          />
        </div>
      </div>

      <div className="logout-section">
        <button className="logout-button" onClick={handleLogout}>
          <img src={logout} alt="logout image" />
          Logout
        </button>
      </div>
    </div>
  );
});

export default Aside;
