import { Link } from "react-router-dom";

const CTAButton=({text,active,linkto})=>{
return(
    <Link to={linkto}>
    <button className={`text-center text-[13px] px-6 py-3 rounded-md font-bold
                        ${active?"bg-yellow-50 text-black":"bg-richblack-800 text-white"}
                        hover:scale-90 transition-all duration-200`}
    >{text}</button>
    </Link>
)
}

export default CTAButton;