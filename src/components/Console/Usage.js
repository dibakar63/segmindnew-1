import React from 'react'
import Navbar2 from './Navbar2'


const Usage = () => {
  return (
    <div className='container'>
  <Navbar2/>
    <div  className='content'>
      <div className='s_card'>
        <div className='cardL'>
            <h4>TOTAL REQUESTS</h4>
            <h2>0</h2>
        </div>
        <div className='cardL'>
        <h4>REQUESTS TODAY</h4>
        <h2>6</h2>
        </div>
        <div className='cardL'>
        <h4>CREDITS LEFT</h4>
        <h2>$0</h2>
        </div>
        <div className='cardL'>
            <h4>FREE CREDITS LEFT</h4>
            <h2>$0.4</h2>
        </div>
      </div>
      <p>Usage Breakdown</p>
      <br/>
      
      <span>Pick a date range</span>
      <br/>
      <input style={{width:"250px",height:"30px",borderRadius:"13px",marginTop:"2px",border:"1px solid rgb(213,210,210)"}}/>  <button style={{background:"purple",width:"90px",height:"30px",border:"none",borderRadius:"15px"}}>Search</button>

      <table>
        <th style={{borderBottom:"1px solid rgb(213,210,210)"}}>
            <td>Date</td>
            <td style={{paddingLeft:'90px'}}>Model</td>
            <td style={{paddingLeft:'90px'}}># of Completed Infereces</td>
            <td style={{paddingLeft:'290px'}}>Credit Cut</td>
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

export default Usage
