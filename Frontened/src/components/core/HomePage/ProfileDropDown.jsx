import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { IoIosArrowDown } from "react-icons/io";

import { logout } from "../../../services/operations/authApi"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()


 

  if (!user) return null

  return (
    <div className=" group relative flex items-center gap-x-1">
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
       
      </div>
      <div className="relative">
    <AiOutlineCaretDown className='transition-all duration-200 group-hover:rotate-180' />
    <div className="absolute left-10 top-full z-10 flex flex-col rounded-md bg-richblack-500 p-4 
                  text-richblack-900 w-[120px] -translate-x-[100px] translate-y-5 opacity-0 invisible 
                    transition-all duration-200 group-hover:opacity-100 group-hover:visible ">
      
      <div className='flex flex-col text-center'>
        <p onClick={()=>navigate("/dashboard/my-profile")} className="cursor-pointer">Dashboard</p>
        <p onClick={()=>dispatch(logout(navigate))} className="cursor-pointer">Logout</p>
      </div>
    </div>
    </div>
      
    
  

    
    </div>
  )
}



