import {useContext, createContext, useState} from 'react'

const fileHandle = createContext()


export function useFileHandle(){

    return useContext(fileHandle)
}


export default function FileHandleContextProvider({children}){

const [alertOn, setAlertOn] = useState(false)
const [pressedButton, setPressedButton] = useState("")
const [tableUpdated, setTableUpdated] = useState(false)




    return <fileHandle.Provider value = {{alertOn, setAlertOn, pressedButton, setPressedButton,
        tableUpdated, setTableUpdated
       }}>

    {children}

    </fileHandle.Provider>
}