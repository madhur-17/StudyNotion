import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner';
import OTPInput from "react-otp-input";
import { Link, useNavigate } from 'react-router-dom';
import { setLoading } from '../slice/authSlice';

function VerifyEmail() {
    const navigate=useNavigate();
    const [otp,setOtp]=useState("");
    const {loading,signupData } =useSelector(state=>state.auth);
    const dispatch=useDispatch();

    useEffect(()=>{
        if(!signupData){
            navigate("/signup");
        }
    },[])

    const submitHandler=(e)=>{
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,email,password,confirmpassword
        }=signupData;
        dispatch(signup(  accountType,firstName,lastName,email,password,confirmpassword,otp,navigate));
    }
  return (
    <div>
      {
        loading?<div><Spinner/></div>:(
            <div>
                <h1> verify Email</h1>
                <p>A verification code has been sent to you.Enter the code below</p>
                <fomr onSubmit={submitHandler} >
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        placeholder='-'
                        renderSeparator={<span><t/></span>}
                        renderInput={props=> <input {...props}/>}
                    />
                    <button type='submit'>
                        Verify Email
                    </button>
                </fomr>
                <div>
                    <Link to={"/signin"}>
                        <p>Back To Login</p>
                    </Link>

                    <button onClick={()=>dispatch(sendotp(signupData.email))}>
                        Resend it
                    </button>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default VerifyEmail

const {loading} =useSelector(state=>state.auth);
const dispatch=useDispatch();{
    loading?<div><Spinner/></div>:(
        <div>
            <h1> verify Email</h1>
            <p>A verification code has been sent to you.Enter the code below</p>
            <fomr>

            </fomr>
        </div>
    )
}