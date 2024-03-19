import React from "react";
import "./Dashboard.css";

import Navbar from "../components/Navbar";
import Aside from "../components/Aside";
import Content from "../components/Content";
import AlertBox from "../components/AlertBox";
import {useFileHandle} from "../context/Context"
import leftonlyarrow from "/leftonlyarrow.svg";
import rightonlyarrow from "/rightonlyarrow.svg";



const Dashboard = () => {


  console.log("dashboard rendered");

  const {alertOn} = useFileHandle()
  return (<>
  {alertOn && <AlertBox />}
    <div className="dashboard">
      <Aside />
      <Navbar />
      <Content />
      <PageNumber />
    </div>
    </>
  );
};

export default Dashboard;


function PageNumber() {
  return (
    <div className="pagefooter">
      <img src={leftonlyarrow} alt="left only arrow" />
      {Array.from({ length: 4 }, (item, index) => {
        return (
          <button id={`page-buttons`} key={index}>
            {index + 1}
          </button>
        );
      })}
      <img src={rightonlyarrow} alt="right only arrow" />
    </div>
  );
}