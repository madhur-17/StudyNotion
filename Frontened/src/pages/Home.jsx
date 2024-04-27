import React from "react";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import Highlight from "../components/core/HomePage/Highlight";
import CTAButton from "../components/core/HomePage/CTAButton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";


const Home = () => {
    return (
        <div>
            {/*section-1*/}
            <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent">
                <Link to={"/signup"}>
                    <div className="group mt-16 mx-auto bg-richblack-800 rounded-full  flex font-bold text-richblack-200 
                                     transition-all duration-200 hover:scale-90 w-fit">
                        <div className="flex flex-row space-x-3 items-center group-hover:bg-richblack-900 px-3 py-2">
                            <BsPersonCircle />
                            <p>Become an Instructor</p>

                        </div>
                    </div>
                </Link>
                <div className="mt-7 text-center text-4xl font-semibold">
                    Empower Your Future with <Highlight text="Coding Skills" />
                </div>
                <div className="mt-3 w-[55%] text-center text-md font-bold text-richblack-300">
                    With our online courses,you can learn at your own pace, from anywhere in the world, and get access
                    to the resources, projects, quizzes and personalized feedback from instructor.
                </div>
                <div className="flex flex-row gap-7 mt-8">
                    <CTAButton text="Learn More" linkto="/signup" active={true} />
                    <CTAButton text="Book a Demo" linkto="/signup" active={false} />
                </div>
                <div className="w-[70%] mx-3 my-12 shadow-blue-200">
                    <video muted loop autoPlay>
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>

            </div>


            <div className="w-11/12  mx-auto flex flex-col max-w-maxContent">
                <CodeBlocks
                    position={"row"}
                    heading={
                        <div className="font-semibold text-2xl text-white">
                            Unlock Your <Highlight text={"coding potential"} /> with our online courses
                        </div>
                    }
                    subheading={`With our online courses,you can learn at your own pace, from anywhere in the world, and get access 
                    to the resources, projects, quizzes and personalized feedback from instructor.`
                    }
                    ctabtn1={{
                        text: "try it yourself",
                        active: true,
                        linkto: "/signup"
                    }}
                    ctabtn2={{
                        text: "learn more",
                        active: false,
                        linkto: "/signup"
                    }}

                    codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<p>This is paragraph</p>\n<img src="./asset/abc.png" />\n</body>`}
                codecolor={"text-yellow-25"}
                />
            </div>
            {/*section2*/}


        </div>
    )

}

export default Home;