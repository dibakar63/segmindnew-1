import React from 'react'
import Navbar2 from './Navbar2'

const TrainingHub = () => {
  return (
    <div className='container'>
  <Navbar2/>
    <div  className='content'>
     
      <p>Model Training Usage Breakdown</p>
      <br/>
      
      <span>Pick a date range</span>
      <br/>
      <input style={{width:"250px",height:"30px",borderRadius:"13px",marginTop:"2px",border:"1px solid rgb(213,210,210)"}}/>  <button style={{background:"purple",width:"90px",height:"30px",border:"none",borderRadius:"15px"}}>Search</button>

      <table>
        <th style={{borderBottom:"1px solid rgb(213,210,210)"}}>
            <td>Pipeline Name</td>
            <td style={{paddingLeft:'90px'}}>Charge Rate (/s)</td>
            <td style={{paddingLeft:'90px'}}># of Seconds</td>
            <td style={{paddingLeft:'290px'}}>Total Cost</td>
        </th>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
      </table>
      <p></p>
   
    </div>
    </div>
    
  )
}

export default TrainingHub
