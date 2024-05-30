import React, { useEffect, useState } from 'react';
import { enrolledCourses } from '../../../services/operations/profileApi';
import {useSelector} from "react-redux";
import Spinner from "../../common/Spinner";
import ProgressBar from "@ramonak/react-progress-bar";

function EnrolledCourses() {
    const {token}=useSelector(state=>state.auth)
    const [courses,setCourses]=useState(null);
    const getEnrolledCourses=async()=>{
        const res=await enrolledCourses(token);
       // console.log(res)
        setCourses(res);
        
    };

    useEffect(()=>{
        getEnrolledCourses();
    },[])
  return (
    <div className='text-yellow-200'>
      
      <h1>Enrolled Courses</h1>
        {
            !courses?(<Spinner/>):(!courses.length?<p>You are not Enrolled in any courses</p>:(
                <div>
                        <div className='flex flex-row gap-x-5'>
                        <p>Course Name</p>
                        <p>Duration</p>
                        <p>Progress</p>
                        </div>
                        {
                            courses.map((ele,ind)=>(
                               
                                <div className='text-white flex flex-row py-3 px-6' key={ind}>
                                <div>
                                <img src={ele.thumbnail} alt='image' width={80} height={50}/>
                                </div>
                                <div>
                                    
                                    <p>{ele.courseName}</p>
                                    <p>{ele.courseDescription}</p>
                                </div>
                                <div>
                                <p>{ele?.progress}</p>
                                <ProgressBar completed={ele?.progress||0} customLabel='Not there Yet' height='8px'/>;
                                </div>
                                </div>
                            ))
                        }
                </div>
            ))
        }
    </div>
  )
}

export default EnrolledCourses
