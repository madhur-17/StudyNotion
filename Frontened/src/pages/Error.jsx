  import React from 'react'
  import img1 from "../assets/Images/error_bg1.jpeg"
  import img2 from "../assets/Images/error_bg.jpeg"
  import img3 from "../assets/Images/error_text.jpeg"
  import img4 from "../assets/Images/error_man.jpeg"
import { useLocation } from 'react-router-dom'
import CTAButton from '../components/core/HomePage/CTAButton'
  function Error() {
    const location=useLocation();
    return (
      <div className='flex flex-col'>
          <div>
            <img src={img1} className='w-full h-[400px] relative'/>
            <img src={img2} className='absolute top-0 left-[57%] translate-y-[100px]'/>
            <img src={img3} className='absolute top-0 left-[30%] translate-y-[100px]'/>
            <img src={img4} 
            className='absolute top-0 left-[50%] translate-y-[100px]'/>
            </div>

          <div className='text-white text-center mt-10 text-2xl italic'>
          The requested URL <span className='not-italic text-blue-100 '>{location.pathname}</span> was not found on this server. <span className='text-richblack-500'>That's all we know.</span>
          </div>
          <div className='flex mx-auto p-6'>
          <CTAButton active={true} linkto={"/"} text={"StudyNotion"}/>
          </div>
        
          
      </div>
    )
  }

  export default Error
