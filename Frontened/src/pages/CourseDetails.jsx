import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import  {buyCourse} from "../services/operations/paymentApi.jsx"
function CourseDetails() {
    const {courseId}=useParams();
    const {user}=useSelector(state=>state.profile);
    const {token}=useSelector(state=>state.auth);
    const dispatch=useDispatch();
    const [courseData,setCourseData]=useState([]);
    const navigate =useNavigate();
    
    const [confirmationModal, setConfirmationModal] = useState(null)
   



    const handleBuyCourse = () => {
      if (token) {
        buyCourse(token, [courseId], user, navigate, dispatch)
        return
      }
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to Purchase Course.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      })
    }
  return (
    <div className='items-center justify-center+'>
      <button onClick={handleBuyCourse} className='bg-yellow-25'> BUY</button>
    </div>
  )
}

export default CourseDetails
