import { useContext, createContext, useState } from "react";

const fileHandle = createContext();

export function useFileHandle() {
  return useContext(fileHandle);
}

export default function FileHandleContextProvider({ children }) {
  const [alertOn, setAlertOn] = useState(false);
  const [pressedButton, setPressedButton] = useState("");
  const [tableUpdated, setTableUpdated] = useState(false);
  const [deleteEmail, setDeleteMail] = useState();
  const [checkedBoxEmails, setCheckedBoxEmails] = useState([]);
  const [nameCheckbox, setNameCheckbox] = useState(false);
  const [receivedData, setReceivedData] = useState([]);
  const [searchDataOnTable, setSearchDataOnTable] = useState({
    state: false,
    value:[]
  });

  return (
    <fileHandle.Provider
      value={{
        alertOn,
        setAlertOn,
        pressedButton,
        setPressedButton,
        tableUpdated,
        setTableUpdated,
        deleteEmail,
        setDeleteMail,
        checkedBoxEmails,
        setCheckedBoxEmails,
        nameCheckbox, 
        setNameCheckbox,
        receivedData,
         setReceivedData,
         searchDataOnTable, 
         setSearchDataOnTable
      }}
    >
      {children}
    </fileHandle.Provider>
  );
}
