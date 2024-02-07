import React from 'react'
import Navbar2 from './Navbar2'

const Billing = () => {
  return (
    <div className='container'>
    <Navbar2/>
      <div  className='content'>
        <button style={{background:"purple",width:"150px",height:"30px",border:"none",borderRadius:"15px",marginTop:"20px"}}>Add Credits</button>
        <button style={{background:"purple",width:"200px",height:"30px",border:"none",borderRadius:"15px",marginLeft:"20px"}}>Convert to Postpaid</button>

        <p>Credits History</p>
      <br/>
      
      <span>Pick a date range</span>
      <br/>
      <input style={{width:"250px",height:"30px",borderRadius:"13px",marginTop:"2px",border:"1px solid rgb(213,210,210)"}}/> <button style={{background:"purple",width:"90px",height:"30px",border:"none",borderRadius:"15px"}}>Search</button>

     <table >
      <th style={{borderBottom:"1px solid rgb(213,210,210)"}}>
          <td>Credits</td>
          <td style={{paddingLeft:'190px'}}> Amount</td>
          <td style={{paddingLeft:'190px'}}>Date</td>
          <td style={{paddingLeft:'190px'}}>Reference#</td>
      </th>
      <tr>
          <td></td>
          <td ></td>
          <td></td>
      </tr>
     </table>
      </div>
      </div>
      
  )
}

export default Billing
