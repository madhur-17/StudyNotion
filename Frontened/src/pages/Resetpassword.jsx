import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Link}  from "react-router-dom"
import { getPasswordResetToken } from '../services/operations/authApi';
import Spinner from '../components/common/Spinner';
function Resetpassword() {
    const {loading}=useSelector(state=>state.auth);
    const [emailSent,setEmailSent]=useState(false);
    const [email,setEmail]=useState("");
    const dispatch=useDispatch();
  return (
    <div className='text-white flex my-auto mx-auto'>

    {
        loading?(<div><Spinner heading='Sending Email' line1="Checking database" line2="Validating Email" line3="Sending Otp" /></div>):(
            <div className='flex  flex-col'>
                <h1 >{!emailSent?"Reset Your Password":"Check Email"}</h1>
                <p>{!emailSent?"Have no fear.We'll email you instructions to reset your password":`We have sent the reset email to ${email}`}</p>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    dispatch(getPasswordResetToken(email,setEmailSent));
                }}>
                    {
                        !emailSent&&(
                            <label>
                                <p>Email Address <sup>*</sup></p>
                                <input
                                    type='email'
                                    required
                                    name='email'
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    placeholder='demo@gmail.com'
                                    className='text-black'
                                />
                            </label>
                        )
                    }
                    <br/>
                    <button className='bg-yellow-200 py-2 px-6 rounded-md' type='submit'>
                        {!emailSent?"Reset Password":"Resend Email"}
                    </button>
                </form>
                <div>
                    <Link to="/signin">
                        <p>Back to signin</p>
                    </Link>
                </div>
        </div>)
    }
      
    </div>
  )
}

export default Resetpassword
