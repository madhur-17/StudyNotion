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

function App() {
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
      


      <Route element={
               <PrivateRoute>
               <DashBoard/>
               </PrivateRoute>} 
               path='/dashboard'>
              <Route path="/dashboard/my-profile" element={<MyProfile />} /> 
      
      </Route>
    

    <Route path='*' element={<Error/>}></Route>








     </Routes>
   
    </div>
  )
}

export default App
