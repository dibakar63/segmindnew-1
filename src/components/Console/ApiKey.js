import React from 'react'
import Navbar2 from './Navbar2'

const ApiKey = () => {
  return (
  <div className='container'>
  <Navbar2/>
    <div  className='content'>
      <h1>Api Keys</h1>
      <p>Your secret API keys are listed below. Please note that, for security reasons, it is important not to share your API keys with others or expose them in the browser or client-side code.
</p>
<p>
Please be aware that you have the ability to set an expiry date for your API keys. Once the expiry date is reached, the API key will be considered expired and no longer valid for use. It is important to manage and keep track of the expiry dates of your API keys to ensure proper security and access control.

</p>
   <table >
    <th style={{borderBottom:"1px solid rgb(213,210,210)"}}>
        <td>API Key</td>
        <td style={{paddingLeft:'590px'}}> Status</td>
        <td style={{paddingLeft:'90px'}}>Actions</td>
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

export default ApiKey
