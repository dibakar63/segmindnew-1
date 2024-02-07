import React from 'react'
import Navbar2 from './Navbar2'

const Referalss = () => {
  return (
    <div className='container'>
    <Navbar2/>
    <div className='content'>
        <h1>Referrals</h1>
        <p>Join the Segmind Referal Program and turn your recommendations into rewards! For every friend or colleague you refer who signs up using your unique referral link, both you and your referee earn credits. It's our way of saying thank you for spreading the word about Segmind!</p>

        <ul>
            <li>Send your referral link to a friend/colleague who hasn't yet signed up with Segmind.</li>
            <li>Have them sign up using a valid email address.</li>
            <li>Once they make at least one API call or request, you will earn $5 in credits</li>
            <li>Please note that it may take a few hours for the credits to be reflected in your account.</li>
            <li>You can invite up to ten friends and earn a maximum of $50 in credits.</li>

        </ul>
         <br/>
         <span style={{cursor:"pointer"}}>Terms and Conditions Apply</span>
         <br/>
         <table >
    <th style={{borderBottom:"1px solid rgb(213,210,210)"}}>
        <td>Referred Email</td>
        <td style={{paddingLeft:'590px'}}> Bonus Received</td>
        
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

export default Referalss
