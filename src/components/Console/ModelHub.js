import React from 'react'
import Navbar2 from './Navbar2'
import { FaPlus } from "react-icons/fa6";


const ModelHub = () => {
  return (
    <div className='container'>
    <Navbar2/>
      <div  className='content'>
        
        <h1 >Model Hub</h1>
      <br/>
      
      
       <button style={{background:"purple",width:"290px",height:"35px",border:"none",borderRadius:"15px",fontSize:"12px"}}><FaPlus/> <strong>Import New Model</strong></button>

     <table >
      <th style={{borderBottom:"1px solid rgb(213,210,210)"}}>
          <td>Model name</td>
          <td style={{paddingLeft:'190px'}}> Status</td>
          <td style={{paddingLeft:'190px'}}>BaseModel</td>
          <td style={{paddingLeft:'190px'}}>Actions</td>
      </th>
      <tr>
          <td></td>
          <td ></td>
          <td></td>
          <td></td>
      </tr>
     </table>
      </div>
      </div>
  )
}

export default ModelHub
