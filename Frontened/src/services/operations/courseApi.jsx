import { apiConnector } from "../apiConnector";
import { categories } from "../api";
import {toast} from "react-hot-toast";
import {course_endpoints,section_endpoints,subSection_endpoints} from "../api";

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
    //console.log(data);
    //console.log(token);

    try {
      const response = await apiConnector("POST", course_endpoints.CREATE_COURSE, data, {
        
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
        
      })
      console.log(" API RESPONSE............", response)
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
        Authorization: `Bearer ${token}`,
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



  export const updateSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST",section_endpoints.EDIT_SECTION , data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Section")
      }
      toast.success("Course Section Updated")
      result = response?.data?.data
    } catch (error) {
      console.log("UPDATE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }


  export const createSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
   
    
    try {
      if (!token) {
        throw new Error("Authorization token is required");
      }
      const response = await apiConnector("POST", section_endpoints.CREATE_SECTION, data, {
        Authorization: `Bearer ${token}`,
      })
      //console.log(response);
     // console.log("CREATE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Create Section")
      }
      toast.success("Course Section Created")
     // console.log(response.data.data)

      result = response?.data?.data
    } catch (error) {
      console.log("CREATE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }


  export const deleteSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", section_endpoints.DELETE_SECTION, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Section")
      }
      toast.success("Course Section Deleted")
      result = response?.data?.data
    } catch (error) {
      console.log("DELETE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  export const createSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", subSection_endpoints.CREATE_SUBSECTION, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Add Lecture")
      }
      toast.success("Lecture Added")
      result = response?.data?.data
    } catch (error) {
      console.log("CREATE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  export const deleteSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", subSection_endpoints.DELETE_SUBSECTION, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Lecture")
      }
      toast.success("Lecture Deleted")
      result = response?.data?.data
    } catch (error) {
      console.log("DELETE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  export const updateSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", subSection_endpoints.UPDATE_SUBSECTION, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Lecture")
      }
      toast.success("Lecture Updated")
      result = response?.data?.data
    } catch (error) {
      console.log("UPDATE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
