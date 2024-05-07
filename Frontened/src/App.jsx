import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/common/NavBar'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Resetpassword from './pages/Resetpassword'
import UpdatePassword from './pages/UpdatePassword'

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
     </Routes>
   
    </div>
  )
}

export default App
