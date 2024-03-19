import React, { useEffect, useState } from "react";

import "./TableData.css";

import bin from "/bin.svg";
import editPencil from "/editpencil.svg";
import upboldarrow from "/upboldarrow.svg";
import downboldarrow from "/downboldarrow.svg";
import { useFileHandle } from "../context/Context";
const tableHeadings = [
  "Name",
  "Designation",
  "Company",
  "Industry",
  "Email",
  "Phone number",
  "Country",
  "Action",
];

const TableData = () => {
  const [ receivedData, setReceivedData] = useState([])
const {tableUpdated, setTableUpdated} = useFileHandle()

useEffect(()=>{

  fetch("http://localhost:3000/contact", {
    method: 'GET',
    headers:{
      'Content-Type': "application/json",
      Accept: "application/json",
    }
  })
  .then(res=>res.json())
  .then(data=>{
    
    setReceivedData(data)
  })
  .catch(e=>console.log(e))

}, [tableUpdated])











  return (
    <>
      <table className="records-data">
        <thead>
          <tr>
            {tableHeadings.map((item, index) => {
              return (
                <th className={item} key={item}>
                  <div className="table-heading-names">
                    {index === 0 && (
                      <input
                        type="checkbox"
                        name="colCheckbox"
                        id="first-col-checkbox"
                      />
                    )}
                    <span>{item}</span>

                    {index === 1 || index === 2 || index === 3 ? (
                      <div className="arrows-images">
                        <img src={upboldarrow} alt="up arrow" />
                        <img src={downboldarrow} alt="down arrow" />
                      </div>
                    ) : null}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {receivedData.map((item, index) => {
            return (
              <tr className="data-row" key={item.Name}>
                <td>
                  <div className="first-col">
                    <input
                      type="checkbox"
                      name="colCheckbox"
                      id="first-col-checkbox"
                    />
                    <span>{item.Name}</span>
                  </div>
                </td>
                <td>{item.Designation}</td>
                <td>{item.Company}</td>
                <td>{item.Industry}</td>
                <td>{item.Email}</td>
                <td>{item.PhoneNumber}</td>
                <td>{item.Country}</td>
                <td>
                  <div className="action-icons">
                    <button className="edit-row">
                      <img src={editPencil} alt="pencil edit" />
                    </button>

                    <button className="delete-row">
                      <img src={bin} alt="bin" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TableData;
