import React from 'react'

function RenderCartAmount({total}) {

  const handleSubmit=()=>{
    
  }
  return (
    <div>
      <p>
        {total}
      </p>
      <button onClick={handleSubmit}>Buy Now</button>
    </div>
  )
}

export default RenderCartAmount
