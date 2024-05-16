import {setLoading,setToken} from "../../slice/authSlice"
import {setUser} from "../../slice/profileSlice"
import { apiConnector } from "../apiConnector";
import {auth} from "../api";
import {toast} from "react-hot-toast"


export const sendotp=(email,navigate)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const res=await apiConnector("POST",auth.SEND_OTP,{email});
            if (!res.data.success) {
                throw new Error(res.data.message)
              }
              toast.success("OTP Sent Successfully")
              navigate("/verify-email")
        }
        catch(error){
            console.log("SENDOTP API ERROR............", error);
            toast.error("Could Not Send OTP");
        }
        dispatch(setLoading(false));
    }
}

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


export const logout=(navigate)=>{
    return(dispatch)=>{
        dispatch(setToken(null));
        dispatch(setUser(null));
       
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/");
    }
}



export const signup=(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
  )=> 
    {
    return async (dispatch) => {
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", auth.SIGNUP, {
          accountType,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          otp,
        })
  
       
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Signup Successful")
        navigate("/signin")
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error("Signup Failed")
        navigate("/signup")
      }
      dispatch(setLoading(false))
      
    }
  }


export function signin(email, password, navigate) {
    return async (dispatch) => {
      
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", auth.SIGNIN, {
          email,
          password,
        })

  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        dispatch(setUser({ ...response.data.user}))
        
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.user))
        navigate("/dashboard/my-profile")
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
      }
      dispatch(setLoading(false))
      
    }
  }

