import { createSlice } from "@reduxjs/toolkit";

const initialState={
    courseSelectionData:[],
    courseEntrieData:[],
    completedLectures:[],
    totalNoOfLectures:0,
}


const viewCourseSlice=createSlice({
    name:"viewcourse",
    initialState,
    reducers:{
        setCourseSectionData(state,action){
            state.courseSelectionData=action.payload
        },
        setEntireCourseData(state,action){
            state.courseEntrieData=action.payload
        },
        setTotalNoOfLectures: (state, action) => {
            state.totalNoOfLectures = action.payload
        },
        setCompletedLectures: (state, action) => {
            state.completedLectures = action.payload
        },
        updateCompletedLectures: (state, action) => {
            state.completedLectures = [...state.completedLectures, action.payload]
        },
    }
})

export const {setCompletedLectures,setTotalNoOfLectures,setCourseSectionData,
    setEntireCourseData,updateCompletedLectures}= viewCourseSlice.actions;

export default viewCourseSlice.reducer;
