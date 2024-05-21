import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseApi';
import CourseTable from './InstructorCourses/CourseTable';

export default function MyCourses() {

  const {token}=useSelector(state=>state.auth);
    const [course,setCourse]=useState([]);
    const navigate=useNavigate();


    useEffect(()=>{
        const fetchCourses=async()=>{
            const res=await fetchInstructorCourses(token);
            if(res){
                setCourse(res);
            }
        }
        fetchCourses();
    },[])
    
  return (
    
    
    <div>
         <div>
                   
         <h1>My Courses</h1>
            <button onClick={()=>navigate("/dashboard/add-course")}>Add Course</button>     
            
         </div>
         {
           course&&<CourseTable course={course} setCourse={setCourse}/>
         }
    </div>
  )
}

