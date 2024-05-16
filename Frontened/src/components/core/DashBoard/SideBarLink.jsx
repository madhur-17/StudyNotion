import React from 'react';
import * as Icons from "react-icons/vsc";
import { useDispatch } from 'react-redux';
import {NavLink, matchPath, useLocation} from "react-router-dom";

function SideBarLink({ele}) {
     const Icon=Icons[ele.icon];
     const location=useLocation();
     const dispatch=useDispatch();
     const match = (route) => {
      return matchPath({ path: route }, location.pathname);
    }
  return (
    <>
        <NavLink to={ele.path}
        className={`${match(ele.path)?"bg-yellow-800 text-yellow-200":" bg-opacity-0"}`}
        >
            <div className='flex flex-row items-center p-4 gap-3'>
                <Icon style={{ fontSize: '24px' }}/>
                <p>{ele.name}</p>

            </div>
        </NavLink>
    </>
  )
}

export default SideBarLink
