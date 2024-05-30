


export default function ConfirmMoadl({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-yellow-50">
          {modalData?.text2}
        </p>
        <div className='flex flex-row justify-between'>
                <button onClick={modalData?.handlebtn1}
                className=' text-yellow-25 bg-richblack-400 px-3 py-2 rounded-md hover:bg-white hover:text-richblack-800 '
                >{modalData?.textbtn1}</button>
                <button onClick={modalData?.handlebtn2}
                className='bg-richblack-400 px-3 py-2 rounded-md hover:bg-white hover:text-richblack-800 '
                >{modalData?.textbtn2}</button>
            </div>
      </div>
    </div>
  )
}