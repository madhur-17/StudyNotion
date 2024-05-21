import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import Spinner from '../../../common/Spinner';
import {getFullDetailsOfCourse} from "../../../../services/operations/courseApi"
import { setCourse, setEditCourse } from '../../../../slice/courseSlice';
function EditCourse() {
  const dispatch=useDispatch();
  const {courseId}=useParams();
  const {course}=useSelector(state=>state.course);
  const [loading,setLoading]=useState(false);
  const {token}=useSelector(state=>state.auth);


  useEffect(()=>{
    const editcourse=async()=>{
      setLoading(true);
      const res=await getFullDetailsOfCourse(courseId,token);
      if(res){
        dispatch(setEditCourse(true));
        dispatch(setCourse(res));

      }
      setLoading(false);
    }
    editcourse();
  },[])


  if(loading){
    return <Spinner/>
  }



  return (
    <div>
      <h1>Edit Course</h1>
      {course?(<RenderSteps/>):(<p>Course Not found</p>)}
    </div>
  )
}

export default EditCourse
