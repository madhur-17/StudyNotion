import React, { useEffect, useState } from 'react'

function ReqirementsForm({name,label,register,errors,setValue,}) {

    const [requirement,setRequirement]=useState("");
    const [requirementList,setRequirementList]=useState([]);
    const addhandler=()=>{
        if(requirement){
            setRequirementList([...requirementList,requirement]);
            setRequirement("");
        }
    }
    const removehandle=(ind)=>{
       const newl=[...requirementList];
       newl.splice(ind,1);
       setRequirementList(newl);
        
    }
    useEffect(()=>{
        register(name,{required:true})
    },[])

    useEffect(()=>{
      setValue(name,requirementList);
    },[requirementList])
  return (
    <div>
        <label>{label}<sup>*</sup></label>
        <div>
          <input
            type='text'
            id={name}
            value={requirement}
            onChange={(e)=>setRequirement(e.target.value)}

          />
          {
            
          }
          <button onClick={addhandler} type='button'>Add</button>
        </div>
        {
          requirementList.length>0&&(<div>
            <ul>
              {
                requirementList.map((ele,ind)=>(
                  <li key={ind}>
                    <span>{ele}</span>
                    <button onClick={()=>removehandle(ind)} type='button'>Clear</button>
                  </li>
                ))
              }
            </ul>

          </div>)
        }
        {errors[name]&&(
          <span>
            {label} is requied
          </span>
        )}
    </div>
  )
}

export default ReqirementsForm
