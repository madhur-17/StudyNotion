import React from 'react'
import { useRef,useEffect } from 'react';

function ConfirmMoadl({modalData}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, []);

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    modalData.handlebtn2();
  };

  return (
    <dialog ref={dialogRef} className="dialog-styles bg-richblack-700 text-white back">
        <div>
            <p>{modalData.text1}</p>
            <p>{modalData.text2}</p>
            <div>
                <button onClick={modalData?.handlebtn1}>{modalData?.textbtn1}</button>
                <button onClick={()=>handleClose()}>{modalData?.textbtn2}</button>
            </div>
        </div>      
    </dialog>
  )
}

export default ConfirmMoadl
