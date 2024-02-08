import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate=useNavigate();
  return (
    <div className='container-fluid home'>
    <div className='col home_header '>
         <span className='home_title'><strong>Fastest APIs from Models</strong></span>
         <p className='home_p'>Effortlessly leverage powerful generative models in your apps with APIs,<strong>zero setup required</strong></p>
        
         <input type='text' className='search_input'/>
         <button className=' search_btn'>Generate</button>
    
         <div className='col home_img'>
         <img
            src="https://www.segmind.com/_next/image?url=%2Fsdxl2.jpeg&w=640&q=75"
            alt="panda"
          />
          </div>
    </div>
    <div className='row content mt-16'>
        <div className='col-4 generative'>
            <h1>Generative AI</h1>
            <p className='home_p2'>Generative AI helps to create new artificial content or data that includes Images, Videos, Music, or even 3D models without any effort required by humans. The advancements in LLM have led to the development of Generative AI. </p>
             <br/><button className='trymodel_btn' onClick={()=>navigate('/models')}>Try Models</button>
        </div>
        <div className='col-8 img2 '>
        <img
            src="https://www.segmind.com/_next/image?url=https%3A%2F%2Fwww.segmind.com%2Fsdxl2.jpeg&w=3840&q=75"
            alt="person"
          />
          <img className='img3'
            src="https://www.segmind.com/_next/image?url=https%3A%2F%2Fwww.segmind.com%2Fsdxl2.jpeg&w=3840&q=75"
            alt="person"
          />
          <div className='propmt border'>
          <p ><strong>Propmt</strong>:Cute panda and robot painting a canvas,live ,realistic hight details 4k</p>
          </div>
          
        </div>
    </div>
    <div className='Content'>
        <h1>Popular Models</h1>
        <div className='models'>
        <img className='img4'
            src="https://www.segmind.com/_next/image?url=https%3A%2F%2Fwww.segmind.com%2Fsdxl2.jpeg&w=3840&q=75"
            alt="person"
          />
          <img className='img4'
            src="https://www.segmind.com/_next/image?url=https%3A%2F%2Fwww.segmind.com%2Fsdxl2.jpeg&w=3840&q=75"
            alt="person"
          />
          <img className='img4'
            src="https://www.segmind.com/_next/image?url=https%3A%2F%2Fwww.segmind.com%2Fsdxl2.jpeg&w=3840&q=75"
            alt="person"
          />
          <img className='img4'
            src="https://www.segmind.com/_next/image?url=https%3A%2F%2Fwww.segmind.com%2Fsdxl2.jpeg&w=3840&q=75"
            alt="person"
          />
        </div>
        <button className='trymodel_btn2'>See All Models</button>
    </div>
    <div className='Developer_sec'>
    <h1>AI-generated Image For All creatives</h1>
        <div className='models'>
        <div className='models_inner'>
        <img className='img5'
            src="https://www.segmind.com/_next/image?url=https%3A%2F%2Fwww.segmind.com%2Fsdxl2.jpeg&w=3840&q=75"
            alt="person"
          />
          <span>For Designer</span>
          </div>
          <div className='models_inner'>
        <img className='img5'
            src="https://www.segmind.com/_next/image?url=https%3A%2F%2Fwww.segmind.com%2Fsdxl2.jpeg&w=3840&q=75"
            alt="person"
          />

          <span>For entrepreneurs</span>
          
          </div>
          <div className='models_inner'>
        <img className='img5'
            src="https://www.segmind.com/_next/image?url=https%3A%2F%2Fwww.segmind.com%2Fsdxl2.jpeg&w=3840&q=75"
            alt="person"
          />
          <span>For developers</span>
          
          </div>
          <div className='models_inner'>
        <img className='img5'
            src="https://www.segmind.com/_next/image?url=https%3A%2F%2Fwww.segmind.com%2Fsdxl2.jpeg&w=3840&q=75"
            alt="person"
          />
          <span>For Content Creaters</span>
          
          </div>
          
        </div>
        </div>
        <div className='footer_content'>
            <div className='row'>
                <div className='col ' style={{textAlign:"left"}} >
                    <span>Fuel your creativity with aburst of inspiration.</span>
                    <p style={{fontSize:"16px",color:"white"}}>Experience the fastest stable diffusion APIs available today.</p>
                </div>
                <div className='col-5' >
                    <button className='trymodels_btn' onClick={()=>navigate("/models")}>Try Models</button>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Home
