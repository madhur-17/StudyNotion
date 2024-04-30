import React from 'react'
import img from "../../../assets/Images/Instructor.png"
import Highlight from './Highlight'
import CTAButton from './CTAButton'

function INstructor() {
  return (
    <div className='flex flex-row gap-20 items-center justify-center'>
       <div className='w-[50%]'>
       <img src={img} className='p-10'/>
 
       </div>
       <div className='w-[50%] flex flex-col p-3 gap-y-4'>
                <p className='text-4xl font-semibold '>Become an <br/><Highlight text={"instructor"}/> </p>
                <p className='text-[16px] text-pure-greys-100 w-[80%] font-medium'>Instructors from around the world teach millions of students on StudyNotion.We provide the tools and skills to teach what you love</p>
                <CTAButton active={true} text={"Start teaching todday"} linkto={"/signin"} 
                />
       </div>
    </div>
  )
}

export default INstructor
