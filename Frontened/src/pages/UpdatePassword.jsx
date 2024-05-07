import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/operations/authApi';


function UpdatePassword() {
    const navigate=useNavigate();
    const location=useLocation();
    const dispatch=useDispatch();
    const {loading} =useSelector(state=>state.auth);
    const [formData ,setFormData]=useState({password:"",confirmPassword:""});
    const changeHandler=(e)=>{
        setFormData((prev)=>(
            {
                ...prev,
                [e.target.name]:e.target.value,

            }
        ))}

    const handleSubmit=(e)=>{
        e.preventDefault();
        const token=location.pathname.split("/").at(-1);
        
        dispatch(resetPassword(formData.password,formData.confirmPassword,token));
        navigate("/signin");
        
    }


  return (
    <div>
      {loading?(<div><Spinner/></div>):(
        <div className='text-white'>

        <h1>Choose new password </h1>
        <p>Almost Done.Enter your new password and you are all set</p>
        <form onSubmit={handleSubmit}>
            <label>
                <p>New Password<sup>*</sup></p>
                <input
                    type='password'
                    placeholder='****'
                    name='password'
                    value={formData.password}
                    onChange={changeHandler}
                    required
                />
            </label>
            <label>
                <p>Confirm Password</p>
                <input
                    required
                    type='password'
                    placeholder='****'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={changeHandler}
                />
            </label>
            <button type='submit' >
                Reset Password
            </button>
        </form>

        </div>
      )}
    </div>
  )
}

export default UpdatePassword
