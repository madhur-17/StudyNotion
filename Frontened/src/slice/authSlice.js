import { createSlice } from "@reduxjs/toolkit";


const initialState={
    signupData:null,
    loading:null,
    token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null
}

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken(state,value){
            state.token=value.payload;
        },
        setLoading(state,action){
            state.loading=action.payload;
        },
        setSignupData(state,action){
            state.signupData=action.payload;
        }
    }
});

export const{setToken,setLoading,setSignupData} =authSlice.actions
export default authSlice.reducer