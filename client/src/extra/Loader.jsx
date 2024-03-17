import React from 'react'
import { createPortal } from 'react-dom'
import loader from '/load.svg'
import "./Loader.css"
const Loader = () => {
  return createPortal(<>
   <div className="loader-overlay"/>
   <div className='loader'>
        <img src={loader} alt="loader image" />
    </div>
    </>, document.getElementById("loader")

  )
}

export default Loader