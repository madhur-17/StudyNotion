import { useSelector } from "react-redux";
import RenderCartAmount from "./RenderCartAmount";
import RenderCartCourses from "./RenderCartCourses";



const Cart=()=>{
    const {totalItems,total}=useSelector(state=>state.cart)

    return(
        <div>
            <h1>Your Cart</h1>
            <p>Your total items:{totalItems}</p>
            {
                total>0?(<><RenderCartCourses/><RenderCartAmount total={total}/></>):(<p>Empty </p>)
            }
        </div>
    )
}




export default Cart;