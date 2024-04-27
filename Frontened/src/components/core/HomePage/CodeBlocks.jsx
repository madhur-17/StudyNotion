import React from "react";
import CTAButton from "./CTAButton";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks=({
    position,heading,subheading,ctabtn1,ctabtn2,codeblock,bggradient,codecolor
})=>{
    return(
            <div className={`flex flex-${position} my-20 justify-between gap-10 mx-10` }>
                <div className="w-[50%] flex flex-col gap-8 ">
                    {heading}
                    <div className="text-richblack-300 font-bold">
                        {subheading}
                    </div>
                    <div className="flex gap-7 mt-7">
                        <CTAButton text={ctabtn1.text} linkto={ctabtn1.linkto} active={ctabtn1.active}/>
                        <CTAButton text={ctabtn2.text} linkto={ctabtn2.linkto} active={ctabtn2.active}/>
                    </div>
                </div>

                <div className=" flex flex-row lg:w-[500px]">
                    <div className="w-[10%] flex flex-col text-richblack-300 text-center font-inter font-bold">
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>7</p>
                        <p>8</p>
                        <p>9</p>
                        <p>10</p>
                    </div>
                    <div  className={`w-[10%] flex flex-col gap-2 font-mono font-bold ${codecolor} pr-2`}>
                            <TypeAnimation
                                    sequence={[codeblock,1000,""]}
                                    repeat={Infinity}
                                    cursor={true}
                                    speed={10}
                                    omitDeletionAnimation={true}
                                    style={{
                                             whiteSpace: "pre",
                                             
                                                display: "block",
                                             
                                    }}
                                    
                            />
                    </div>
                </div>




            </div>
    );
}

export default CodeBlocks;