import React from 'react'
import Buttonbar from './Buttonbar'
import "./Content.css"
import TableData from './TableData'

const Content = () => {
  return (
    <div className='content-main'>
      <div className="content-main-inside">
      <Buttonbar />
      <TableData />
      
      </div>
        
       
    </div>
  )
}

export default Content