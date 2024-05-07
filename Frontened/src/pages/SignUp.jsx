import React from 'react'
import Template from '../components/core/Form/Template'
import Signuplogo from "../assets/Images/signup.webp"
function SignUp() {
  return (
    <div>
      <Template
        title="Join to code"
        des1="Build skills for today, tomorrow, and beyond."
        des2="Education to future-proof your career."
        formtype={"signup"}
       
        imagelink={Signuplogo}
      />
    </div>
  )
}

export default SignUp