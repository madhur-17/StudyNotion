import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import Highlight from "../../core/HomePage/Highlight";
const tabsName=[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

function Explore() {
    const [currentTab,setCurrentTab]=useState(tabsName[0]);
    const [course,setCourse]=useState(HomePageExplore[0].courses);
    const [currsetCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);

    const setMyCard=(value)=>{
        setCurrentTab(value);
        const res=(HomePageExplore.find(ele=>ele.tag===value));
        setCourse(res.courses);
        setCurrentCard(res.courses[0].heading);
    }

  return (
    <div className='flex flex-col items-center mb-12'>
            <div className='text-4xl font-semibold'>Unlock the power of <Highlight text="CODE"/> </div>
            <div className='text-center font-medium text-pure-greys-200 mt-3'>Learn to Build Anything You can Imagine</div>
            <div className='flex flex-row mt-5 bg-richblack-800 rounded-full '>
                {
                    tabsName.map((ele,ind)=>{
                        return(
                            <div className={`text-[16px]  items-center ${currentTab==ele?"bg-richblack-900 text-richblack-5 "
                                                            :"text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer px-5 py-2
                                                            hover:scale-95`}
                                 key={ind}
                                 onClick={()=>setMyCard(ele)}>
                                {ele}
                                
                            </div>
                        )
                    })
                }
            </div>
            <div className='h-[150px]'></div>
                
                <div className=' flex flex-row gap-10'>
                    {
                        course.map((ele,ind)=>{
                            return(
                                <div key={ind}>
                                    {ele.heading}
                                </div>
                            )
                        })
                    }
                </div>

            
    </div>
  )
}

export default Explore
