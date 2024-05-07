import React from 'react'
import SignupForm from './SignupForm'
import SigninForm from './SigninForm'
import frame from "../../../assets/Images/frame.png"
import { FcGoogle } from "react-icons/fc";

function Template({title,imagelink,des1,des2,formtype}) {
  return (
    <div className='flex justify-evenly mt-10'>
        <div>
            <h1 className='text-white text-3xl font-semibold leading-[2.75rem]'
            >{title}</h1>
            <p>
                <span className='text-white leading-2'>{des1}</span><br/>
                <span className='text-blue-500 leading-2 italic'>{des2}</span>
            </p>
            {formtype==="signup"?<SignupForm />:<SigninForm />}
            <div className='flex text text-slate-600  w-full items-center gap-x-2 my-4'>
                <div className='h-[1px] bg-gray-800 w-full'></div>
                <div>OR</div>
                <div className='h-[1px] bg-gray-800 w-full'></div>
            </div>

            <div>
                <button className='flex justify-center items-center border bg-richblack-700 border-black w-full py-2 px-2 gap-x-4 rounded-full text-white'>
                    <FcGoogle/>
                    <p>{formtype==="signup"?"Signup":"Signin"} with google</p>
                </button>
            </div>
        </div>
        <div className='realtive w-11/12 max-w-[450px] '>
            <img src={frame}
             alt="Pattern"
             width={558}
             height={460}
             loading='lazy'>

             </img>
             <img src={imagelink}
             alt="Pattern"
             width={450}
             height={400}
             loading='lazy'
             className='absolute top-[6rem] right-[16rem]'
             
             />
        </div>
    </div>
  )
}

export default Template
