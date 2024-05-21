import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { COURSE_STATUS } from '../../../../utils/constants';
import { FaClock, } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import ConfirmMoadl from '../../../common/ConfirmMoadl';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseApi';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useNavigate } from 'react-router-dom';

function CourseTable({ course, setCourse }) {
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const navigate=useNavigate();

    const handleDeleteCourse = async (courseId) => {
        setLoading(true);
        await deleteCourse({ courseId }, token);
        setLoading(false);
        const res = await fetchInstructorCourses(token);
        if (res) {
            setCourse(res);
        }
        setConfirmationModal(null);
        setLoading(false);
    };

    return (
        < >
            <Table className="text-white w-full">
                <Thead>
                    <Tr>
                        <Th>Courses</Th>
                        <Th>Duration</Th>
                        <Th>Price</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {course.length === 0 ? (
                        <Tr>
                            <Td colSpan="4">No courses found</Td>
                        </Tr>
                    ) : (
                        course.map((ele) => (
                            <Tr key={ele._id}>
                                <Td>
                                    
                                    <img src={ele?.thumbnail} alt='Thumbnail' />
                                    <div>
                                        <p>{ele?.courseName}</p>
                                        <p>{ele?.courseDescription}</p>
                                        <p>Created:</p>
                                        {ele.status === COURSE_STATUS.DRAFT ? (
                                            <>
                                                <FaClock />
                                                <p>DRAFTED</p>
                                            </>
                                        ) : (
                                            <>
                                                
                                                <p>PUBLISHED</p>
                                            </>
                                        )}
                                    </div>
                                </Td>
                                <Td>2hr:30min</Td>
                                <Td>{ele.price}</Td>
                                <Td>
                                    <button disabled={loading} onClick={()=>{
                                        navigate(`/dashboard/edit-course/${ele._id}`)
                                    }}><CiEdit /></button>
                                    <button disabled={loading} onClick={() => {
                                        setConfirmationModal({
                                            text1: "Delete this course",
                                            text2: "This course will be permanently deleted.",
                                            textbtn1: "Delete",
                                            textbtn2: "Cancel",
                                            handlebtn1: () => handleDeleteCourse(ele._id),
                                            handlebtn2: () => setConfirmationModal(null),
                                        });
                                    }}>
                                        <MdDelete />
                                    </button>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>
            {confirmationModal && <ConfirmMoadl modalData={confirmationModal} />}
        </>
    );
}

export default CourseTable;
