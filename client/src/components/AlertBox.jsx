import React, { useEffect, useState } from "react";
import "./AlertBox.css";

import { useFileHandle } from "../context/Context";
import * as XLSX from "xlsx";

import check from "/check.svg";
import deleteicon from "/deleteAlerticon.svg";
import uploadfile from "/uploadfile.svg";

const AlertBox = () => {

  const { pressedButton, setAlertOn, tableUpdated, setTableUpdated } = useFileHandle();
  const [arrayNumber, setArrayNumber] = useState(0);

  const [csvFile, setCsvFiles] = useState([]);
  useEffect(() => {
    setArrayNumber((prev) => {
      let value;
      if (pressedButton === "Import") {
        value = 0;
      } else if (pressedButton === "Delete") {
        value = 2;
      }

      return value;
    });
  }, [pressedButton]);

  useEffect(() => {
    if (csvFile.length > 0) {
      fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(csvFile),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setArrayNumber(1);
          setCsvFiles([]);
          setTableUpdated(prev=>!prev)
        })
        .catch((e) => console.log(e));
    }
  }, [csvFile]);

  function handleFileDrop(e) {
    e.preventDefault();

    const newFile = e.dataTransfer.files[0];

    if (newFile && fileTypes.includes(newFile.type)) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(newFile);
      reader.onload = (event) => {
        const data = event.target.result;

        try {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          const csvData = XLSX.utils.sheet_to_json(worksheet);
          setCsvFiles(csvData);
        } catch (e) {
          console.error("Error", e);
        }
      };
    } else {
      console.log("please add a csv file");
    }
  }

  return (
    <>
      <div className="alert-overlay" />

      {arrayNumber === 0 ? (
        <div
          className="alert-box"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
        >
          <div className="alert-icon">
            <img src={alertArray[arrayNumber]?.imgUrl} alt="tick image" />
          </div>
          <h3>{alertArray[arrayNumber]?.title}</h3>
          <h6>{alertArray[arrayNumber]?.message} </h6>

          <button id="import-cancel-btn" onClick={() => setAlertOn(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="alert-box" onClick={() => setAlertOn(false)}>
          <div className="alert-icon">
            <img src={alertArray[arrayNumber]?.imgUrl} alt="tick image" />
          </div>
          <h3>{alertArray[arrayNumber]?.title}</h3>
          <h6>{alertArray[arrayNumber]?.message} </h6>
        </div>
      )}
    </>
  );
};

export default AlertBox;

const alertArray = [
  {
    title: "Import File",
    message: "Drag and Drop a CSV File to Upload",
    imgUrl: uploadfile,
  },
  {
    title: "Import Complete",
    message: "CSV File is Uploaded",
    imgUrl: check,
  },
  {
    title: "Delete Contacts",
    message: "Sure you want to delete the Contacts ?",
    imgUrl: deleteicon,
  },
  {
    title: "Deleted Contacts",
    message: "",
    imgUrl: check,
  },
];

const fileTypes = [
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
];
