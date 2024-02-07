import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div className='container-fluid footer'>
      <div className='row no-margin'>
        <div className='col-4'>
            <h1>Legacies AI</h1>
        </div>
        <div className='col' >
            <h3>Product</h3>
            <li>Docs</li>
            <li>Models</li>
            <li>Blogs</li>
            <li>Events</li>
        </div>
        <div className='col' >
            <h3>Company</h3>
            <li>About</li>
            <li>Privacy</li>
            <li>Terms</li>
        </div>
       <div className='col'>
        <h3>Contact</h3>
       </div>
      </div>
    </div>
  )
}

export default Footer
