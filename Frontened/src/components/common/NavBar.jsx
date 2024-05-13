import React, { useEffect, useState } from 'react';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropDown from '../core/HomePage/ProfileDropDown';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/api';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function NavBar() {
  const getCatalog = async () => {

    try {
      const res = await apiConnector("GET", categories.ALL_CATEGORIES_API);

      
      setSubLinks(res.data.Category);
    }
    catch (Error) {
      console.log(Error);
    }
  }
  const [subLink, setSubLinks] = useState([]);
  useEffect(() => {
    getCatalog();

  }, [])


  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector(state => state?.profile);
  const { totalItems } = useSelector(state => state?.cart);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const match = (route) => {
    return matchPath({ path: route }, location.pathname);
  }
  return (
    <div className='border-b-[1px] border-b-richblack-500 h-14 border-2 justify-center flex'>
      <div className='w-11/12 flex flex-row items-center max-w-maxContent justify-between'>
        <div>
          <Link to={"/"}>
            <img src={logo} width={160} height={42} loading='lazy' />
          </Link>
        </div>
        <div>
          <nav>
            <ul className='flex gap-x-6 text-richblack-25'>
              {
                NavbarLinks.map((ele, ind) => {
                  return (
                    <li key={ind}>
                      {ele.title == "Catalog" ? (
                        <div className='flex gap-x-1 items-center cursor-pointer group relative'>
                          <p>{ele.title}</p>
                          {subLink?.length > 0 && (
                            <div className="relative">
                              <IoIosArrowDown className='transition-all duration-200 group-hover:rotate-180' />
                              <div className="absolute left-0 top-full z-10 flex flex-col rounded-md bg-richblack-50 p-4 
                                            text-richblack-900 w-[300px] -translate-x-[143px] translate-y-5 opacity-0 invisible 
                                              transition-all duration-200 group-hover:opacity-100 group-hover:visible">
                                <div className='absolute left-[50%] top-0 h-6 w-6 rotate-45 bg-richblack-50 transform -translate-x-3 translate-y-[-50%] rounded-sm'></div>
                                <ul className='text-center'>
                                  {subLink?.map((ele) => (
                                    
                                    <li key={ele._id} onClick={() => navigate(`/${ele.name}`)}>
                                      {ele.name}
                                    </li>
                                 
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (


                        <Link to={ele?.path} className={`${match(ele?.path) ? "text-yellow-25" : "text-white"}`}>
                          {ele.title}
                        </Link>)}
                    </li>
                  )
                })
              }
            </ul>
          </nav>
        </div>


        <div className='text-richblack-5 gap-x-1 flex'>
          {
            user && user?.accountType != "Instructor" && (
              <Link to="/dashboard/cart" className='relative'>
                <FaShoppingCart style={{ fontSize: '24px' }} />

                {totalItems > 0 && (
                  <span className='absolute -top-2 left-[9px]  text-[11px]   animate-bounce'>
                    {totalItems}
                  </span>
                )}
              </Link>


            )
          }
          {
            token == null && (
              <div className='flex gap-x-3'>
                <button onClick={() => navigate("/signin")} className='hover:scale-95  duration-200 transition-all'>Sign in</button>
                <button className='border-richblack-400 border-[1px] p-2 rounded-md hover:scale-95 duration-200 transition-all' onClick={() => navigate("/signup")}>Sign up</button>
              </div>
            )
          }
          {
            token != null && <ProfileDropDown />
          }

        </div>


      </div>
    </div>
  )
}

export default NavBar
