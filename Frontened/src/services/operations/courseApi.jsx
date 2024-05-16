import { apiConnector } from "../apiConnector";
import { categories } from "../api";
import {toast} from "react-hot-toast";
import {course_endpoints} from "../api";
export const getAllCategories=async()=>{
    let result=[];
    try{
        const res=await apiConnector("GET",categories.ALL_CATEGORIES_API);
        if(!res.data.success){
            throw new Error("Could not fetch");
        }
        result=res?.data?.data;
    }
    catch(error){
        console.log(error);
    }
    return result;
}

export const addCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", course_endpoints.CREATE_COURSE, data, {
        "Content-Type": "multipart/form-data",
        Authroziation: `Bearer ${token}`,
      })
      console.log("CREATE COURSE API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Add Course Details")
      }
      toast.success("Course Details Added Successfully")
      result = response?.data?.data
    } catch (error) {
      console.log("CREATE COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }



export const editCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", course_endpoints.EDIT_COURSE, data, {
        "Content-Type": "multipart/form-data",
        Authroziation: `Bearer ${token}`,
      })
      console.log("EDIT COURSE API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Course Details")
      }
      toast.success("Course Details Updated Successfully")
      result = response?.data?.data
    } catch (error) {
      console.log("EDIT COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }