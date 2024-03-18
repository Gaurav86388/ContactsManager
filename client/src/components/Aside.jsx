import React,{memo} from 'react'
import "./Aside.css"
import dashboardicon from '/dashboardicon.svg'
import contactsicon from '/contactsicon.svg'
const Aside = memo(function Aside (){
  return (
    <div className='aside'>
          <h3>Logo</h3>
          <div className="tabs">
            <div className="dashboard-block">
              <img src={dashboardicon} alt="dashboardicon" />
            <input type="button" value="Dashboard" id="dashboard-toggle"/>
            </div>
            
            <div className="contacts-block">
            <img src={contactsicon} alt="contactsicon" />
            <input type="button" value="Total contacts" id="total-contacts-toggle"/>
            </div>
            
          </div>
    </div>
  )
})

export default Aside