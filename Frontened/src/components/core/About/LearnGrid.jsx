import React from 'react'
import { LearningGridArray } from '../../../data/AboutData'
import Highlight from '../HomePage/Highlight'
import CTAButton from "../HomePage/CTAButton";

function LearnGrid() {
  return (
    <div className='grid grid-cols-4  mx-auto '>
        {
            LearningGridArray.map((ele,ind)=>{
                return(
                    <div key={ind}
                    className={`${ind==0&&"col-span-2 bg-richblack-900"}
                    ${
                        ele.order%2==1?"bg-richblack-700":"bg-richblack-800"
                    }
                    ${
                        ele.order==3&& "col-start-2"
                    }
                    h-[240px] flex items-center 
                    `
                    }
                    >
                    {
                        ele.order<0?<div>
                             <div>
                             {ele.heading}
                             <Highlight text={ele.highlightText} />
                             </div>
                             <p>{ele.description}</p>
                             <CTAButton text={ele.BtnText} linkto={ele.BtnLink} active={true} />
                        </div>:
                        <div className='flex flex-col gap-8 p-7'>
                            <h1>{ele.heading}</h1>
                            <p>{ele.description}</p>
                        </div>
                    }
                    </div>
                )
            })
        }
      
    </div>
  )
}

export default LearnGrid
