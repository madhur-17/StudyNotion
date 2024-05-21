import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import {setStep,setEditCourse,setCourse} from "../../../../../slice/courseSlice"
import {toast} from "react-hot-toast"
import {updateSection,createSection} from "../../../../../services/operations/courseApi"
import NestedView from './NestedView';
function CourseBuilderForm() {
  const {
    register,
    setValue,
   
    handleSubmit,
    formState:{errors}
  }=useForm();
  const [editSection,setEditSection]=useState(null);
  const [loading,setLoading]=useState(false);
  const {course}=useSelector(state=>state.course)
  const dispatch=useDispatch();
  const {token}=useSelector(state=>state.auth);
  const handleCancle=()=>{
    setEditSection(null);
    setValue("sectioName","");
  }
  const handlenext=()=>{
    if(course.courseContent.length==0){
      toast.error("Add Section");
      return;
    }
    if(course.courseContent.some((section)=>section.subSection.length==0)){
      toast.error("Add SubSection");
      return;
    }
    dispatch(setStep(3));
  }

  
  const submithandler=async(data)=>{
    setLoading(true);
    let result;
    if(editSection){
      result=await updateSection({sectionName:data.sectionName,sectionId:editSection,courseId:course._id},token);
      console.log(result);
    }
    else{
      
      result=await createSection({sectionName:data.sectionName,courseId:course._id},token);
     
    }
    if(result){
      
      dispatch(setCourse(result));
      
      setEditSection(null);
      setValue("sectionName","");
    }

    setLoading(false);
  }

  const handleChangeEditSectionName=(sectionId,sectionName)=>{
    if(editSection==sectionId){
      handleCancle();
      return;
    }
    setEditSection(sectionId);
    setValue("sectionName",sectionName);
  }




  return (
    <div>
      <p>Course Builder</p>
      <form onSubmit={handleSubmit(submithandler)}>
        <label>Section Name <sup>*</sup></label>
        <input
          id='sectionName'
          placeholder='Section'
          {...register("sectionName",{required:true})}
        />
        {
          errors.setionName&&<span>Section Name is needed</span>
        }
        <div>
          <button type='submit' className='gap-x-3'>{editSection?"Edit Section Name":"Create Section"}</button>
          {editSection&&<button type='button' onClick={handleCancle}>Cancel Edit</button>}
        </div>
      </form>
        
      {
        
      course?.courseContent?.length>0 &&(<NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>)
    }

    <div>
        <button onClick={()=>{
          dispatch(setStep(1));
          dispatch(setEditCourse(true));
        }} type='button'>Back</button>
        <button onClick={handlenext}>Next</button>
    </div>

    </div>

    

  )
}

export default CourseBuilderForm
