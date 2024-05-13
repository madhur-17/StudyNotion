import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function MyProfile() {
    const user=useSelector(state=>state.profile);
    const navigate=useNavigate();

    return (
    <div className='text-yellow-200 flex-flex-col items-center'>
        <h1>My Profile</h1>
        
        <div>
            <div>
                <img src={user.user?.image} className='aspect-square w-[40px] rounded-full object-cover'/>
                <div>
                    <p>{user.user?.firstName +""+ user.user?.lastName}</p>
                    <p>{user.user?.email}</p>
                </div>
            </div>
            <button onClick={()=>navigate("/dashboard/settings")}>Edit</button>
        </div>  
        <div>
            <p> About</p>
            <button onClick={()=>navigate("/dashboard/settings")}>Edit</button>
            {console.log(user)}
            <p>{user.user.additionalDetails.about}</p>
        </div>
        <div>
            <h>Personal Details</h>
            <button onClick={()=>navigate("/dashboard/settings")}>Edit</button>
            <div>
                <div>
                    <p>
                        FirstName
                    </p>
                    <p>{user.firstName}</p>
                </div>
                <div>
                    <p>
                        LasttName
                    </p>
                    <p>{user.firstName}</p>
                </div>
                <div>
                    <p>
                        emailtName
                    </p>
                    <p>{user.firstName}</p>
                </div>
                <div>
                    <p>
                        contactNumber
                    </p>
                    <p>{user.firstName}</p>
                </div>
                <div>
                    <p>
                        gender
                    </p>
                    <p>{user.firstName}</p>
                </div>
                <div>
                    <p>
                        date of birth
                    </p>
                    <p>{user.firstName}</p>
                </div>
            </div>

        </div>
    </div>
  )
}

    export default MyProfile

