import react from "react"
import {toast} from "react-hot-toast"
import {apiConnector} from "../apiConnector"
import { category_endpoints } from "../api"

export const getCatalogPageData=async(categoryId)=>{
    const toastid=toast.loading("Loading...");
    let result=null;
    try{
        console.log(categoryId);
        const res=await apiConnector("POST",category_endpoints.CATALOG_DATA,{categoryId});
        console.log(res);
        if(!res.data.success){
            throw new Error("Error in fetching data");
        }
        result=res?.data?.data;
    }
    catch(error){
        console.log(error.message);
    }
    toast.dismiss(toastid);
    return result;
}