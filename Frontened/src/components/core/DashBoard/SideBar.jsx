import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links';
import {logout} from "../../../services/operations/authApi";
import {useDispatch, useSelector} from "react-redux";
import Spinner from '../../common/Spinner';
import SideBarLink from './SideBarLink';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';
import ConfirmMoadl from '../../common/ConfirmMoadl';

function SideBar() {
    const {user,loadind:profileLoading}=useSelector(state=>state.profile);
    const {loading:authLoading}=useSelector(state=>state.auth);
    const [confirmationModal,setConfirmationMoal]=useState(null);
    
    const dispatch=useDispatch();
    const navigate=useNavigate();

    if(profileLoading||authLoading){
        return <Spinner/>
    }
  return (
    <div className='flex min-w-[222px] flex-col border-r-[2px] border-r-yellow-300 
                     h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>
      <div className='flex flex-col'>
      {
        sidebarLinks.map((ele,ind)=>{
            if(ele.type && user?.accountType!==ele.type) return null;
            return <SideBarLink ele={ele} key={ele.id}/>
        })
      }

      </div>
      <div className='mx-auto m-6 h-[1px] w-11/12 bg-richblack-400'></div>
      
      <div>
         <SideBarLink ele={{name:"Settings",path:"/dashboard/settings",icon:"VscSettings"}} />

         <button
         onClick={()=>setConfirmationMoal({text1:"Are You Sure",
          text2:"You will be logged out",
          textbtn1:"Logut",
          textbtn2:"Cancel",
          handlebtn1:()=>dispatch(logout(navigate)),
          handlebtn2:()=>(setConfirmationMoal(null)),
         })}
         >
            <div className='flex '>
              <VscSignOut/>
              <p>logout</p>
            </div>

         </button>
      </div>

    
    
    
    {confirmationModal&& <ConfirmMoadl modalData={confirmationModal}/>}
    
    </div>
  )
}

export default SideBar
