import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import {useDispatch, useSelector} from "react-redux"
import { getAllCategories,addCourseDetails,editCourseDetails } from '../../../../../services/operations/courseApi';
import ReqirementsForm from './ReqirementsForm';
import { setStep,setCourse } from '../../../../../slice/courseSlice';
import {COURSE_STATUS} from "../../../../../utils/constants";
import ChipInput from './ChipInput';
import Upload from '../Upload';
import {toast} from "react-hot-toast"
function CourseINformationForm() {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors}
    } =useForm();
    const dispatch=useDispatch();
    const {token}=useSelector(state=>state.auth);
    const {course,editCourse}=useSelector(state=>state.course);
    const [loading,setLoading]=useState(false);
    const [courseCategories,setCourseCategories]=useState([]);



    useEffect(()=>{
        const getCategories=async()=>{
            setLoading(true);
            const cate=await getAllCategories();
            if(cate.length>0){
                setCourseCategories(cate);
            }
            setLoading(false);
        }
        getCategories();
        if(editCourse){
            setValue("courseTitle",course.courseName);
            setValue("courseDesc",course.courseDescription);
            setValue("coursePrice",course.price);
            setValue("courseTags",course.tag);
            setValue("courseCategory",course.category);
            setValue("courseBenefits",course.whatYouWillLearn);
            setValue("courseImage",course.thumbnail);
            setValue("courseRequirements",course.instructions);
        
        }
    },[])

    const isFormUpdated=()=>{
        const currentValues=getValues();
        if(currentValues.courseTitle!=course.courseName||
            currentValues.courseDesc!=course.courseDescription||
            currentValues.coursePrice!=course.price||
            currentValues.courseRequirements.toString()!=course.instructions.toString()||
            currentValues.courseTags.toString()!=course.tag.toString()||
            currentValues.courseCategory._id!=course.category._id||
            currentValues.courseImage!=course.thumbnail||
            currentValues.courseBenefits!=course.whatYouWillLearn
        )
        return true;
        else return false;
    }





    const onSubmit = async (data) => {
    
    if (editCourse) {
      
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if (
          currentValues.courseRequirements.toString() !==course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnail", data.courseImage)
        }
        
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnail", data.courseImage)

    console.log(data.courseImage);
    setLoading(true)
    
    const result = await addCourseDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
  }


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label>
                <p>Course Title<sup>*</sup></p>
                <input 
                    id='courseTitle'
                    placeholder='Enter Course Name'
                    {...register("courseTitle",{required:true})}
                />
                {
                    errors.courseTitle &&(<span>Course Title Required</span>)
                }
            </label>
            <label>
                <p>Course Description<sup>*</sup></p>
                <textarea
                    id='courseDesc'
                    placeholder='Description'
                    {...register("courseDesc",{required:true})}
                />
                {
                    errors.courseDesc &&(<span>Course Description Required</span>)
                }
            </label>
            <label>
                <p>Course Price<sup>*</sup></p>
                <input 
                    id='coursePrice'
                    placeholder='000'
                    {...register("coursePrice",{required:true,valueAsNumber:true})}
                />
                {
                    errors.coursePrice &&(<span>Course Price Required</span>)
                }
            </label>
            <div>
                <label>Course Category<sup>*</sup></label>
                <select
                id='courseCategory'
                defaultValue=""
                {...register("courseCategory",{required:true})}
                >
                    <option value={""} disabled>Choose a Category</option>
                    {
                        !loading&& courseCategories.map((ele,ind)=>(
                            <option key={ind} value={ele?._id}>
                                {ele?.name}
                            </option>
                        ))
                    }
                </select>

                {
                    errors.courseCategories&&<span>Select category</span>
                }
            </div>
            <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter Tags and press Enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />
            <Upload
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
             />
            <label>
                <p>Course Benefits<sup>*</sup></p>
                <textarea
                    id='courseBenefits'
                    placeholder=''
                    {...register("courseBenefits",{required:true})}
                />
                {
                    errors.courseBenefits &&(<span>Course courseBeneifts Required</span>)
                }
            </label>
            <ReqirementsForm
                name="courseRequirements"
                label={"Requirements/Instructions"}
                register={register}
                errors={errors}
                setValue={setValue}
            />
            {
                editCourse&&(
                    <button
                    onClick={()=>dispatch(setStep(2))}
                    >
                        CONTINUE without saving
                    </button>
                )
            }
            <button type='submit'>{!editCourse?"Next":"Save Changes"}</button>

        </div>
      </form>
    </div>
  )
}

export default CourseINformationForm
