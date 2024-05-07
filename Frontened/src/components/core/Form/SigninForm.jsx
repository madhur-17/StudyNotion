import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

function SigninForm() {
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setFormData] = useState({ email: "", password: "" });
  const changehandler = (e) => {
    setFormData((prev) => ({  
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const submithandler = (event) => {
    event.preventDefault();

    
    toast.success("Accounut created");
    nav("/dashboard");
  };
  return (
    <form
      onSubmit={submithandler}
      className="flex flex-col mt-6 w-full gap-x-3"
    >
      <label>
        <p className="text-white leading-[1.5rem] ">
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
      <label className="mt-3 relative">
        <p className="text-white leading-[1.5rem]">
          Password<sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
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
        <Link to="/resetpassword" >
          <p className="text-xs mt-2 text-blue-300 max-w-max ml-auto w-full">Forgot Password </p>
        </Link>
      </label>
      <div className="flex items-center justify-center bg-yellow-200 mt-4 py-2 border border-black rounded-full font-semibold">
        <button>SignIN</button>
      </div>
    </form>
  );
}

export default SigninForm;
