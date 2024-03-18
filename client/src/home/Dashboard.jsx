import React from 'react'
import Navbar from '../components/Navbar'
import Aside from '../components/Aside'
import "./Dashboard.css"
const Dashboard = () => {

  console.log('dashboard rendered')
  return (
    <div>
      <Navbar />
      <Aside />
    </div>
  )
}

export default Dashboard