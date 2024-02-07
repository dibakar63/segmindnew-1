import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoKeyOutline } from "react-icons/io5";
import { RiComputerLine } from "react-icons/ri";
import { CiBadgeDollar } from "react-icons/ci";
import { MdOnDeviceTraining } from "react-icons/md";
import { MdOutlineDataUsage } from "react-icons/md";
import { TbBoxModel2Off } from "react-icons/tb";
import { FaHubspot } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
const Navbar2 = () => {
    const navigate=useNavigate()
  return (
    <div className='nav'>
    <div className='navList'>
      <h3 onClick={()=>navigate('/console/key')}><IoKeyOutline/> Api Key</h3>
      <h3 onClick={()=>navigate('/console/usage')}><RiComputerLine/> Usage</h3>
      <h3 onClick={()=>navigate('/console/billing')}><CiBadgeDollar/> Billing</h3>
      <h3 onClick={()=>navigate('/console/trainingModel')}><MdOnDeviceTraining/> Model Training</h3>
      <h3 onClick={()=>navigate('/console/hub')}><MdOutlineDataUsage/> Training Usage</h3>
      <h3 onClick={()=>navigate('/console/modelhub')}><TbBoxModel2Off/> Model Hub</h3>
      <h3 onClick={()=>navigate('/console/referals')}><FaHubspot/> Referalls</h3>
      <div className='logout' style={{borderTop:"1px solid rgb(213,210,210)"}}>
        <button style={{background:"white",color:"black",border:"none",fontSize:"20px",marginTop:"13px"}}><CiLogout/> Logout</button>
      </div>
    </div>
    </div>
  )
}

export default Navbar2
