import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState={
    totalItems:localStorage.getItem("totalItems")?JSON.parse(localStorage.getItem("totalItems")):0,
    cart:localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")): [],
    total: localStorage.getItem("total")? JSON.parse(localStorage.getItem("total")): 0,

}

export const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        setTotalItems(state,action){
            state.totalItems =action.payload;
        },
        addToCart(state,action){
            const course=action.payload;
            const index=state.cart.findIndex((item)=>item._id==course._id)
            if(index>0){
                toast.error("Course Already Exits");
                return;
            }
            state.cart.push(course);
            state.totalItems=state.totalItems+1;
            state.total=state.total+ course.price;
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            toast.success("Course added to cart");
        },
        removeFromCart(state,action){
            const courseId=action.payload;
            const index = state.cart.findIndex((item) => item._id === courseId);
            if(index>=0){
                state.totalItems--;
                state.total -=state.cart[index].price;
                state.cart.splice(index,1);
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
                toast.success("Course added to cart");

            }

        },
        resetCart: (state) => {
            state.cart = []
            state.total = 0
            state.totalItems = 0
            // Update to localstorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
          },
    }
});
export const {setTotalItems,addToCart,removeFromCart,resetCart} =cartSlice.actions;
export default cartSlice.reducer;
