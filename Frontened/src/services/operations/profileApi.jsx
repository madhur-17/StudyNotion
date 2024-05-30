import  {toast} from "react-hot-toast";
import {setLoading,setUser} from "../../slice/profileSlice.js";
import { apiConnector } from "../apiConnector.jsx";
import { profile_endpoints } from "../api.jsx";




export const enrolledCourses=async(token)=>{
    
    const toastid=toast.loading("Loading...")
    let result=[];
    try{
        const res=await apiConnector("GET",profile_endpoints.ENROLLED_COURSES,null,
            {
                Authorization: `Bearer ${token}`
            })
        if(!res.data.success){
            throw new Error(res.data.message);
        }
       
        result=res.data.data;
    }
    catch(error){
        console.log(error);
    }
    toast.dismiss(toastid);
    return result;
}