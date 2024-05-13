import React from 'react'

function ConfirmMoadl({modalData}) {
  return (
    <div>
        <div>
            <p>{modalData.text1}</p>
            <p>{modalData.text2}</p>
            <div>
                <button onClick={modalData?.handlebtn1}>{modalData?.textbtn1}</button>
                <button onClick={modalData?.handlebtn2}>{modalData?.textbtn2}</button>
            </div>
        </div>      
    </div>
  )
}

export default ConfirmMoadl
