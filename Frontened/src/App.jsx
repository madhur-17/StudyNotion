import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/common/NavBar'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Resetpassword from './pages/Resetpassword'
import UpdatePassword from './pages/UpdatePassword'
import About from './pages/About'
import DashBoard from './pages/DashBoard'
import MyProfile from './components/core/DashBoard/MyProfile'
import VerifyEmail from './pages/VerifyEmail'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import Error from './pages/Error'
import EnrolledCourses from './components/core/DashBoard/EnrolledCourses'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from './utils/constants'
import AddCourse from './components/core/DashBoard/AddCourse'
import MyCourses from './components/core/DashBoard/MyCourses'
import EditCourse from "./components/core/DashBoard/EditCourse"
import Catalog from './pages/Catalog'
import CourseDetails from './pages/CourseDetails'


function App() {
  const {user}=useSelector(state=>state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <NavBar/>
     <Routes>
      <Route path='/' element={<Home/>} ></Route>
      <Route path="/signin" element={<SignIn/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path="/resetpassword" element={<Resetpassword/>}></Route>
      <Route path="/update-password/:id" element={<UpdatePassword/>}></Route>
      <Route path='/aboutus' element={<About/>}></Route>
      <Route path='/verify-email' element={<VerifyEmail/>}></Route>
      <Route path='/catalog/:catalogName' element={<Catalog/>}></Route>
      <Route path='/courses/:courseId' element={<CourseDetails/>}></Route>
      


      <Route element={
               <PrivateRoute>
               <DashBoard/>
               </PrivateRoute>} 
               path='/dashboard'>
              <Route path="/dashboard/my-profile" element={<MyProfile />} /> 

              
              {user?.accountType==ACCOUNT_TYPE.STUDENT&&
              <>
              <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
              </>
              }
              {user?.accountType==ACCOUNT_TYPE.INSTRUCTOR&&
              <>
              <Route path='/dashboard/my-courses' element={<MyCourses/>}/>
              <Route path="/dashboard/add-course" element={<AddCourse/>}/>
              <Route path='/dashboard/edit-course/:courseId' element={<EditCourse/>}/>
              </>
              }
              
      
      </Route>
    

    <Route path='*' element={<Error/>}></Route>








     </Routes>
   
    </div>
  )
}

export default App
