import React from 'react'
import Template from '../components/core/Form/Template'
import loginlogo from "../assets/Images/login.webp"

function SignIn() {
  return (
    <div>
      <Template
        title={"Welcome Back"}
        des1={"Build skills for today, tomorrow, and beyond."}
        des2={"Education to future-proof your career."}
        formtype={"signin"}
       
        imagelink={loginlogo}
      />

    </div>
  )
}

export default SignIn
