import React from 'react'
const statsData=[
    {
        count:"5K",
        label:"Active Students"
    },
    {
        count:"10+",
        label:"Mentors"
    },
    {
        count:"200+",
        label:"Courses"
    },
    {
        count:"50+",
        label:"Awards"
    },

];
function StatsComponent() {
  return (
    <div>
            <div className='flex'>
                {
                    statsData.map((ele,ind)=>{
                        return  (
                                <div key={ind}>
                                <h1>{ele.count}</h1>
                                <p>{ele.label}</p>
                                </div>
                        )
                    })
                }
            </div>    
    </div>
  )
}
export default StatsComponent
