import React, { useEffect, useState } from "react";
import "./TableData.css";
import { useFileHandle } from "../context/Context";
import bin from "/bin.svg";
import editPencil from "/editpencil.svg";
import upboldarrow from "/upboldarrow.svg";
import downboldarrow from "/downboldarrow.svg";

function ActionButtons({ Email }) {
  const { setAlertOn, setPressedButton, setDeleteMail } = useFileHandle();

  function handleDelete() {
    setDeleteMail(Email);
    setPressedButton("Delete");
    setAlertOn(true);
  }

  return (
    <div className="action-icons">
      <button className="edit-row">
        <img src={editPencil} alt="pencil edit" />
      </button>

      <button className="delete-row" onClick={handleDelete}>
        <img src={bin} alt="bin" />
      </button>
    </div>
  );
}

function FirstColCheckBox({ userMail, name, nameCheckbox, receivedData }) {
  const { setCheckedBoxEmails } = useFileHandle();
  const [isChecked, setIsChecked] = useState(nameCheckbox);

  function handleCheck(e) {
    setIsChecked(e.target.checked);

    if (e.target.checked) {
      setCheckedBoxEmails((prev) => [...prev, userMail]);
    } else {
      setCheckedBoxEmails((prev) => {
        const findIndex = prev.findIndex((item) => item === userMail);
        const newArray = prev.filter((item, index) =>
          index !== findIndex ? item : null
        );
        return newArray;
      });
    }
  }

  useEffect(() => {
    if (receivedData) {
      if (nameCheckbox) {
        setIsChecked(true);
        setCheckedBoxEmails((prev) => [...prev, userMail]);
      } else {
        setIsChecked(false);
        setCheckedBoxEmails((prev) => {
          const findIndex = prev.findIndex((item) => item === userMail);
          const newArray = prev.filter((item, index) =>
            index !== findIndex ? item : null
          );
          return newArray;
        });
      }
    }
  }, [nameCheckbox]);

  return (
    <div className="first-col">
      <input
        type="checkbox"
        name="colCheckbox"
        id="first-col-checkbox"
        onChange={handleCheck}
        checked={isChecked}
      />
      <span>{name}</span>
    </div>
  );
}

function RevealFullMail({email}) {
  const [revealMail, setRevealMail] = useState();

  return (
    <div
      className="email-section "
      onMouseEnter={() => setRevealMail(true)}
      onMouseLeave={() => setRevealMail(false)}
    >
      {email.length > 20
        ? email.slice(0, 20).concat("....")
        : email}

      {revealMail && <div className="reveal-mail">{email}</div>}
    </div>
  );
}
//

const TableData = () => {
  const {
    tableUpdated,
    nameCheckbox,
    setNameCheckbox,
    receivedData,
    setReceivedData,
    searchDataOnTable,
  } = useFileHandle();

  const localData = searchDataOnTable.state
    ? searchDataOnTable.value
    : receivedData;



  useEffect(() => {
    const token = localStorage.getItem("jwt")
    fetch("https://contactsmanager-4ml8.onrender.com/contact", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setReceivedData(data);
      })
      .catch((e) => console.log(e));
  }, [tableUpdated]);

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
                        onChange={() => setNameCheckbox((prev) => !prev)}
                        checked={nameCheckbox}
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
          {localData.map((item, index) => {
            return (
              <tr className="data-row" key={item.Name}>
                <td>
                  <FirstColCheckBox
                    userMail={item.Email}
                    name={item.Name}
                    nameCheckbox={nameCheckbox}
                    receivedData={receivedData}
                  />
                </td>
                <td>{item.Designation}</td>
                <td>{item.Company}</td>
                <td>{item.Industry}</td>
                <td>
                  <RevealFullMail email={item.Email}/>
                </td>
                <td>{item.PhoneNumber}</td>
                <td>{item.Country}</td>
                <td>
                  <ActionButtons Email={item.Email} />
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
