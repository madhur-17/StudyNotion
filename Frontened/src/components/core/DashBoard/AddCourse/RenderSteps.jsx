import React from 'react'
import {FaCheck} from "react-icons/fa";
import CourseINformationForm from "./Step1/CourseINformationForm"
import CourseBuilderForm from './Step2/CourseBuilderForm';
import PublishCourseForm from "./Step3/PublishCourseForm"
import { useSelector } from 'react-redux';

function RenderSteps() {
    const steps=[
        {
            id:1,
            title:"Course Information"
        },
        {
            id:2,
            title:"Course Builder",
        },
        {
            id:3,
            title:"Publish",
        }
    ]
    const {step}=useSelector(state=>state.course);
  return (
   <div className='text-yellow-200'>
     <div>
      {steps.map((ele,ind)=>{
        return(
           <div key={ind}>
           <div className={`${step==ele.id?"bg-yellow-900 border-yellow-50 text-yellow-50":
                            "border-richblack-100 bg-richblack-800 text-richblack-400"}`}>
                {
                    step>ele.id?<FaCheck/>:ele.id
                }

            </div>

           </div>
      )})}
    </div>
    <div>
        {steps.map((ele,ind)=>{
            return(<h1 key={ind}>{ele.title}</h1>)
        })}
    </div>
    {step==1&&<CourseINformationForm/>}
    {step==2&&<CourseBuilderForm/>}
    {step==3&&<PublishCourseForm/>}
   </div>
  )
}

export default RenderSteps

