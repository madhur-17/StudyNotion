import React from 'react'
import {useSelector} from "react-redux"
import Spinner from '../components/common/Spinner';
import SideBar from '../components/core/DashBoard/SideBar';
import { Outlet } from 'react-router-dom';


function DashBoard() {
    const {loading:authLoading}=useSelector(state=>state.auth);
    const {loading:profileLoading}=useSelector(state=>state.profile);

    if(authLoading||profileLoading){
        return <Spinner/>
    }


  return (
    <div className='relative min-h-[calc(100vh-3.5rem)] flex flex-row'>
      <SideBar/>
      <div className='h-[calc(100vh-3.5rem)] overflow-auto'>
            <div className='mx-auto w-11/12 '>
                <Outlet/>
            </div>

      </div>

    </div>
  )
}

export default DashBoard
