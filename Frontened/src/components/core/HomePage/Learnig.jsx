import React from 'react'
import Highlight from './Highlight'
import img1 from '../../../assets/Images/Compare_with_others.png'
import img2 from '../../../assets/Images/Know_your_progress.png'
import img3 from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from './CTAButton'

function Learnig() {
  return (
    <div className='w-11/12 mx-auto max-x-maxContent mt-[150px] gap-5'>
                <div className='flex flex-col items-center'>
                        <div className='text-4xl font-bold'>
                            Your swiss knife for <Highlight text="learning any language"/>
                        </div>
                        <div className='text-lg font-mono w-[70%] text-center gap-5 mt-4'>
                           <p> Using Spin making learning multiple languages easy, with 20+ languages realistic voice-over,progress 
                            traking,custom schedule and more.</p>
                        </div>

                        <div className='flex flex-row items-center justify-center mt-5'>
                                
                        <img src={img2} className='relative translate-x-[150px] object-contain'/>
                        <img src={img1} className='relative translate-x-[] object-contain'/>
                        <img src={img3} className='relative translate-x-[-150px] object-contain'/>

                        </div>
                        <div className='mb-32'>
                        <CTAButton text={"Learn More"} active={true} linkto={"/signup"} />
                        </div>

                </div>
      
    </div>
  )
}

export default Learnig
