import React, { useEffect, useState, memo } from "react";
import "./Buttonbar.css";

import deleteicon from "/delete.svg";
import calender from "/calender.svg";
import filters from "/filters.svg";
import importpic from "/importpic.svg";
import exportpic from "/exportpic.svg";
import onlydownarrow from "/onlydownarrow.svg";

import { useFileHandle } from "../context/Context";

function Buttons({ btnName, imgURL }) {
  const { setAlertOn, setPressedButton } = useFileHandle();

  function handleButtonClick() {
    if (btnName === "Import" || btnName === "Delete") {
      setPressedButton(btnName);
      setAlertOn(true);
    }
  }

  return (
    <button className={`buttons-btns`} onClick={handleButtonClick}>
      <img src={imgURL} alt={`${btnName}`} />
      <span>{btnName}</span>
      {btnName === "Select Date" || btnName === "Filters" ? (
        <img src={onlydownarrow} alt="onlydownarrow" id="onlyDownArrow" />
      ) : null}
    </button>
  );
}

const Buttonbar = () => {
  return (
    <div className="button-bar">
      <div className="bar-left">
        {buttonArray.slice(0, 2).map((item, index) => {
          return (
            <Buttons key={item.name} btnName={item.name} imgURL={item.imgURL} />
          );
        })}
      </div>

      <div className="bar-right">
        {buttonArray.slice(2, 5).map((item, index) => {
          return (
            <Buttons key={item.name} btnName={item.name} imgURL={item.imgURL} />
          );
        })}
      </div>
    </div>
  );
};

export default memo(Buttonbar);

const buttonArray = [
  { name: "Select Date", imgURL: calender },
  { name: "Filters", imgURL: filters },
  { name: "Delete", imgURL: deleteicon },
  { name: "Import", imgURL: importpic },
  { name: "Export", imgURL: exportpic },
];
