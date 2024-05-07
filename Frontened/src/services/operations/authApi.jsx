import {setLoading,setToken} from "../../slice/authSlice"
import { apiConnector } from "../apiConnector";
import {auth} from "../api";
import {toast} from "react-hot-toast"

export const getPasswordResetToken=(email,setEmailSent)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const res=await apiConnector("POST",auth.RESET_PASSWORD_TOKEN,{email});
            toast.success("Reset Email Sent");
            setEmailSent(true);
        }
        catch(error){
            
            console.log(error);
            toast.error("User Email not found");
        }
        dispatch(setLoading(false));
    }
}

export const resetPassword=(password, confirmPassword, token )=>{
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
                const res=await apiConnector("POST",auth.RESET_PASSWORD,{password, confirmPassword, token })
                toast.success("Password Updated")
        } 
        catch(error){
            toast.error("Some erroe occured");
        }
        dispatch(setLoading(false));
    }

}