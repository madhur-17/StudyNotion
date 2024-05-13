import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {ACCOUNT_TYPE} from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../../slice/authSlice";
import { sendotp } from "../../../services/operations/authApi";

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [student,setStudent]=useState("student");
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
  const nav = useNavigate();
  const dispatch=useDispatch();
  const [formdata, setFormdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const changehandler = (e) => {
    setFormdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const submithandler = (e) => {
    e.preventDefault()

    if (formdata.password != formdata.confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formdata,
      accountType,
    }
    console.log(signupData);
    dispatch(setSignupData(signupData))
    dispatch(sendotp(formdata.email, nav))

    // Reset
    setFormdata({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }
  return (
    <div className="flex flex-col">
      <div className="flex bg-gray-800 max-w-max rounded-full p-1 gap-x-2 mt-3">
        <button onClick={()=>setStudent("student")} 
        className={`${student === "student"
            ?
            "bg-gray-500 text-white"
            : "bg-transparent text-black"} py-2 px-5 rounded-full transition-all duration-200`}
        
        >Student</button>
        <button 
        className={`${student === "mentor"
            ?
            "bg-gray-500 text-white"
            : "bg-transparent text-black"} py-2 px-5 rounded-full transition-all duration-200`}
        onClick={()=>setStudent("mentor")}>Mentor</button>
      </div>
      <form onSubmit={submithandler}>
        <div className="flex gap-x-2 mt-3">
          <label>
            <p className="text-white leading-[1.5rem]">
              First Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={formdata.firstName}
              placeholder="madhur"
              onChange={changehandler}
              className="w-full rounded-[.5rem] p-2 leading-3 mt-1  bg-gray-800"
            />
          </label>
          <label>
            <p className="text-white leading-[1.5rem]">
              Last Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={formdata.lastName}
              placeholder="agrawal"
              onChange={changehandler}
              className="w-full rounded-[.5rem] p-2 leading-3 mt-1  bg-gray-800"
            />
          </label>
        </div>
        <div className="mt-3">
          <label>
            <p className="text-white leading-[1.5rem]">
              Email Address<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="email"
              value={formdata.email}
              name="email"
              onChange={changehandler}
              placeholder="demo@abc.com"
              className="w-full rounded-[.5rem] p-2 leading-3 mt-1  bg-gray-800"
            />
          </label>
        </div>
        <div className="flex gap-x-2 mt-3">
          <label className="relative">
            <p className="text-white leading-[1.5rem]">
              Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ?"text":"password"}
              value={formdata.password}
              name="password"
              onChange={changehandler}
              placeholder="******"
              className="w-full rounded-[.5rem] p-2 leading-3 mt-1  bg-gray-800"
            />
             <span onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-[35.5px] cursor-pointer"
        >
          {showPassword ? <AiOutlineEyeInvisible fontSize={22} fill="#AFB2BF"/> : <AiOutlineEye fontSize={22} fill="#AFB2BF" />}
        </span>
          </label>
          <label className="relative">
            <p className="text-white leading-[1.5rem]">
              Confirm Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ?"text":"password"}
              value={formdata.confirmPassword}
              name="confirmPassword"
              onChange={changehandler}
              placeholder="******"
              className="w-full rounded-[.5rem] p-2 leading-3 mt-1  bg-gray-800"
            />
             <span onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-[35.5px] cursor-pointer"
        >
          {showPassword ? <AiOutlineEyeInvisible fontSize={22} fill="#AFB2BF"/> : <AiOutlineEye fontSize={22} fill="#AFB2BF" />}
        </span>
          </label>
        </div>
        <button className="mt-9 w-full flex items-center justify-center bg-yellow-200  py-2 border
         border-black rounded-full font-semibold" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
