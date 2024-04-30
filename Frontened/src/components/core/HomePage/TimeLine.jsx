import React from 'react'

import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import image from "../../../assets/Images/TimelineImage.png"

const timeline=[
    {
        Logo:logo1,
        heading:"LeaderShip",
        description:"Fully committed to the success of the company",
    },
    {
        Logo:logo2,
        heading:"Responsibility",
        description:"Fully committed to the success of the company",
    },
    {
        Logo:logo3,
        heading:"Flexibility",
        description:"Fully committed to the success of the company",
    },
    {
        Logo:logo4,
        heading:"Solve the Problem", 
        description:"Fully committed to the success of the company",
    },
]

function TimeLine() {
  return (
    <div className='w-11/12 max-w-maxContent flex flex-col items-center  mx-auto '>
      <div className='flex flex-row gap-20 text-black mt-[150px] items-center'>
        <div className='w-[45%] flex flex-col gap-10 items-center'>
                {
                    timeline.map((element,index)=>{
                        return(
                            <div className='flex flex-row gap-5 ' key={index}>
                                <img src={element.Logo} />
                                <div>
                                <h3>{element.heading}</h3>
                                <p>{element.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
        </div>
        <div className='relative shadow-blue-200'>
                <img src={image} className='h-[450px]'/> 
                <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 
                                left-[50%] translate-x-[-50%] translate-y-[-50%] '>
                        <div className='flex flex-row items-center gap-5 border-r border-caribbeangreen-200 px-6'>
                                <p className='text-3xl font-bold'>10</p>
                                <p className='text-caribbeangreen-300 text-sm'>Years of experience</p>
                        </div>
                        <div className='flex flex-row gap-5 items-center px-7'>
                            <p className='text-3xl font-bold'>250</p>
                            <p className='text-caribbeangreen-300 text-sm'>Types of courses</p>

                        </div>

                </div>

        </div>

      </div>
    </div>
  )
}

export default TimeLine
