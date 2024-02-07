import React from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    const navigate=useNavigate()
  return (
    <div className='Login'>
    <div className='loginw'>
    <span>Hi! Welcome To Legacies AI</span>
    </div>
    <div className='loginCard'>
      <h1>Signup</h1>
      <div style={{display:"flex",gap:"10px"}}>
      <label>Already Login?</label> <button style={{background:"transparent",border:"none",color:"blue",fontSize:"16px",cursor:"pointer"}} onClick={()=>navigate('/login')}>Login Here</button>
      </div>
      
      <div style={{display:"flex",flexDirection:"column",gap:"4px",marginTop:"53px"}}>
      
      <span ><strong>Username</strong></span>
      
      <input type='text' placeholder='Enter your name' style={{width:"470px",height:"49px",borderRadius:"15px",border:"1px solid rgb(1,0,0,0.4)",paddingLeft:"19px"}}/>
      
      <span ><strong>Email</strong></span>
      
      <input type='text' placeholder='Enter your email' style={{width:"470px",height:"49px",borderRadius:"15px",border:"1px solid rgb(1,0,0,0.4)",paddingLeft:"19px"}}/>
      <span><strong>Password</strong></span>

      <input type='text' placeholder='Enter Password' style={{width:"470px",height:"49px",borderRadius:"15px",border:"1px solid rgb(1,0,0,0.4)",paddingLeft:"19px"}}/>
      </div>
      <br/>
      
      <button style={{width:"470px",height:"49px",borderRadius:"15px",background:"blue",border:"none",fontSize:'15px',cursor:"pointer"}}>Signup</button>
      
      </div>
      

    </div>
  )
}

export default Signup
