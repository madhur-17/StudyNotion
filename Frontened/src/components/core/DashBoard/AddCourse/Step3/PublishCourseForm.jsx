import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import {useDispatch,useSelector} from "react-redux"
import { resetCourseState, setCourse, setStep } from '../../../../../slice/courseSlice';
import {COURSE_STATUS} from "../../../../../utils/constants"
import {useNavigate} from "react-router-dom"
import { editCourseDetails } from '../../../../../services/operations/courseApi';
function PublishCourseForm() {
    const {register,setValue,handleSubmit,getValues} =useForm();
    const dispatch=useDispatch();
    const {token}=useSelector(state=>state.auth);
    const {course}=useSelector(state=>state.course);
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();


    useEffect(()=>{
      if(course.status==COURSE_STATUS.PUBLISHED ){
        setValue("public",true);
      }
    },[])
    const submithandler=async(data)=>{
          if(course.status==COURSE_STATUS.PUBLISHED&& getValues("public")==true||
              course.status==COURSE_STATUS.DRAFT&&getValues("public")==false)
              {
                dispatch(resetCourseState);
                navigate("/dashboard/my-courses");
                return;
              }
          const formData=new FormData();
          formData.append("courseId",course._id);
          const currstatus=getValues("public")?COURSE_STATUS.PUBLISHED:COURSE_STATUS.DRAFT;
          formData.append("status",currstatus);
          setLoading(true);
          const result=await editCourseDetails(formData,token);
          dispatch(resetCourseState);
          navigate("/dashboard/my-courses");
          setLoading(false);
    }
    const goback=()=>{
      dispatch(setStep(2));
    }
  return (
    <div>
        <p>Publish Course</p>
        <form onSubmit={handleSubmit(submithandler)}>
              <div>
                <label>Make this Course as Public
                <input
                  type='checkbox'
                  id='checkbox'
                  {...register("public",)}
                />
                <span>Make this course public</span>
                </label>
              </div>
              <div>
                <button disabled={loading} onClick={goback} type='button'>Back</button>
                <button disabled={loading} type='submit'>Publish</button>
              </div>
        </form>

    </div>
  )
}

export default PublishCourseForm
