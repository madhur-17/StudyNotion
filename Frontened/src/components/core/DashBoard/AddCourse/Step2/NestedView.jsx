import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import { TbHttpDelete } from "react-icons/tb";
import { deleteSection ,deleteSubSection} from '../../../../../services/operations/courseApi';
import { BiSolidDownArrow } from "react-icons/bi"
import SubSectionModal from './SubSectionModal';
import ConfirmMoadl from "../../../../common/ConfirmMoadl"
import { setCourse } from '../../../../../slice/courseSlice';

function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector(state => state.course);
  
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(null);
  

  const handleDeleteSection=async(sectionId,courseId,token)=>{
    const res=await deleteSection({ sectionId, courseId},token )
    dispatch(setCourse(res))
      setConfirmationModal(null)
  }
  const handleDeleteSubSection=async(subSectionId,sectionId)=>{
    const res=await deleteSubSection({subSectionId,sectionId},token);
    if(result){
      const updatedCourseContent=course.courseContent.map(ele=> ele._id==sectionId?res:ele);
      const updatedCourse={...course, courseContent:updatedCourseContent}
      dispatch(setCourse(res));
    }
    setConfirmationModal(null);
  }


  return (
    <div>
      <div>
      
        {course?.courseContent?.map((ele) => (
          <details key={ele._id} open className='text-yellow-200'>
            <summary className='flex flex-row gap-x-3'>
              <div className='flex flex-row gap-x-5'>
                <RxDropdownMenu />
                <p>{ele.sectionName}</p>

              </div>
              <div>
                <button type='button' onClick={()=>handleChangeEditSectionName(ele._id, ele.sectionName)}><FaEdit /></button>
                <button type='button' onClick={() => setConfirmationModal({
                  text1: "Delete this Section",
                  text2: "All lectures in this section will be deleated",
                  textbtn1: "Delete",
                  textbtn2: "Cancel",
                  handlebtn1: () =>  handleDeleteSection({ sectionId: ele._id, courseId: course._id,token }),
                  handlebtn2: () => (setConfirmationModal(null)),
                })}><TbHttpDelete /></button>
              </div>
              <span>|</span>
              <BiSolidDownArrow />
            </summary>
            <div>
              {
                ele.subSection.map((data) => (
                  <div key={data._id}
                    onClick={() => setViewSubSection(data)}
                  >
                    <div>
                      <RxDropdownMenu />
                      <p>{data.title}</p>

                    </div>
                    <div>
                      <button type='button' onClick={() => setEditSubSection({ ...data, sectionId: ele._id })}><FaEdit /></button>
                      <button type='button' onClick={() => setConfirmationModal({
                        text1: "Delete this SubSection",
                        text2: " This SubSection will be deleated",
                        textbtn1: "Delete",
                        textbtn2: "Cancel",
                        handlebtn1: () => handleDeleteSubSection(data._id,ele._id),
                        handlebtn2: () => (setConfirmationModal(null)),
                      })}><TbHttpDelete /></button>
                    </div>
                  </div>
                ))
              }
              <button onClick={()=>setAddSubSection(ele._id)}><span>Add Lecture</span></button>
            </div>
          </details>
        ))}
      </div>
          {addSubSection&&<SubSectionModal
            modalData={addSubSection}
            setModalData={setAddSubSection}
            add={true}
          />}
          {viewSubSection&&<SubSectionModal
            modalData={viewSubSection}
            setModalData={setViewSubSection}
            view={true}
          />}
          {editSubSection&&<SubSectionModal
            modalData={editSubSection}
            setModalData={setEditSubSection}
            edit={true}
          />}
          {confirmationModal&&<ConfirmMoadl modalData={confirmationModal}/>}
    </div>
  )
}

export default NestedView

