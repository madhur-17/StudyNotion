import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import {removeFromCart} from "../../../../slice/cartSlice"

function RenderCartCourses({ total }) {
    const dispatch=useDispatch();
    const { cart } = useSelector(state => state.cart);
    return (
        <div>
            {
                cart.length > 0 ? (<div>
                    {cart.map((ele, ind) => (

                        <div key={ind}>
                            <div>
                                <img src={ele?.thumbnail} />
                                <p>{ele?.name}</p>
                                <div>
                                    <ReactStars
                                        count={5}
                                        size={20}
                                        edit={false}
                                        activeColor={"#ffd700"}
                                        emptyIcon={<GiNinjaStar />}
                                        filledIcon={<GiNinjaStar />}
                                    />
                                </div>
                            </div>
                            <div>
                                <button onClick={()=>dispatch(removeFromCart(ele?._id))}>Remove <RiDeleteBin2Fill /></button>
                            </div>
                        </div>

                    ))}
                </div>) : (<p>artEmplty</p>)
            }
        </div>
    )
}

export default RenderCartCourses
