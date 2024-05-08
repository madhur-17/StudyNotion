import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import CountryCode from "../../../data/countrycode.json"
function ContactForm() {
  const [loading,setLoading]=useState(false);
  const{
     register,
     handleSubmit,
     reset,
     formState:{errors,isSubmitSuccessful}
  }=useForm();

  useEffect(()=>{
    if(isSubmitSuccessful){
      reset({
        email:"",
        firstName:"",
        lastName:"",
        phoneNumber:"",
        message:""
      })
    }
  },[reset,isSubmitSuccessful])

  const submitContactForm =async(data)=>{
    try{
      setLoading(true);
      const res={
        res:data
      }
      console.log(res);
      setLoading(false);
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div className='mx-auto p-6'>
      <h1 className='text-4xl'>Get In Touch</h1>
      <p>We'd love to here for you,Please fill out this form</p>
      <div className='text-yellow-200'>
        <form onSubmit={handleSubmit(submitContactForm)}>
                <div className='flex  gap-7'>
                  <div >
                    <label >
                      <p>FirstName<sup>*</sup></p>
                      <input
                        type='text'
                        name='firstName'
                        id='firstName'
                        placeholder='madhur'
                        className='bg-richblack-700 rounded-sm shadow-richblack-200 shadow-md '
                        {...register("firstName",{required:true})}
                        />
                        {
                          errors.firstName&&(
                            <span>
                              Please enter your name
                            </span>
                          )
                        }
                    </label>
                  </div>
                  <div >
                    <label  >
                      <p>LastName<sup>*</sup></p>
                      <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        placeholder='agrawal'
                        {...register("lastName",{required:true})}
                        />
                        {
                          errors.LastName&&(
                            <span>
                              Please enter your name
                            </span>
                          )
                        }
                    </label>
                  </div>
                </div>
                <div >
                    <label >
                      <p>Email<sup>*</sup></p>
                      <input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='demo@gmail.com'
                      
                        {...register("email",{required:true})}
                        />
                        {
                          errors.email&&(
                            <span>
                              Please enter your email
                            </span>
                          )
                        }
                    </label>
                </div>
                <div>
                  <label>PhoneNumber<sup>*</sup></label>
                  <div className='flex flex-row gap-5 text-black'>
                          <div className=' flex w-[15%] '>
                            <select 
                             name='dropdown'
                             {...register("countrycode",{require:true})}
                             className=' w-full'
                             >
                             
                              {
                                CountryCode.map((ele,ind)=>(
                                  
                                    ele.code==="+91" ?<option key={ind} value={ele.code} selected>{ele.code+"-"+ele.country}</option> :<option key={ind} value={ele.code}>{ele.code+"-"+ele.country}</option>
                                  
                                ))
                              }
                             </select>
                          </div>
                          <div className='flex w-[85%]'>
                            <input
                              type='number'
                              placeholder='0123456789'
                              name='phoneNumber'
                              id='phoneNumber'
                              {...register("phoneNumber",{required:{value:true,message:'Please enter phone number'},
                                                          maxLength:{value:10,message:'Invalid Phone NUmber'},
                                                          minLength:{value:8,message:'Invalid Phone NUmber'}
                                                          })}
                            />
                            {
                              errors.phoneNumber&&(
                                <span>{errors.phoneNumber.message}</span>
                              )
                            }
                          </div>
                  </div>
                </div>
                <div>
                  <label>
                    <p>Message</p>
                    <textarea
                      name='message'
                      id='message'
                      cols={30}
                      rows={7}
                      placeholder='Enter Your Message'
                      {...register("message",{required:true})}
                    />
                    {
                      errors.message&&(
                        <span>Enter message</span>
                      )
                    }
                  </label>
                </div>
                <button type='submit'>
                      Send Message
                </button>
                
        </form>
      </div>
    </div>
  )
}

export default ContactForm
