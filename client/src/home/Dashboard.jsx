import React from 'react'
import Navbar from '../components/Navbar'
import Aside from '../components/Aside'
import "./Dashboard.css"
import Content from '../components/Content'

import leftonlyarrow from "/leftonlyarrow.svg"
import rightonlyarrow from "/rightonlyarrow.svg"


function PageNumber(){
  return  <div className="pagefooter">
  
    <img src={leftonlyarrow} alt="left only arrow" />
    {Array.from({length: 4}, (item, index)=>{
  
      return <button id={`page-buttons`} key={index}>{index+1}</button>
    })}
    <img src={rightonlyarrow} alt="right only arrow" />
  </div>
  }

const Dashboard = () => {
    
  console.log('dashboard rendered')
  return (
    <div className='dashboard'>
      <Aside />
       <Navbar />
       <Content />
       <PageNumber />
      
     
      
      
        

    </div>
  )
}

export default Dashboard

//<Content />