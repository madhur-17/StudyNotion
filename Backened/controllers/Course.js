const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const imageUploader = require("../utils/imageUploader");




exports.createCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, whatYouWillLearn, price, tag,category } = req.body;
        const thumbnail = req.files.thumbnail;

        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        const categoryDetails = await Category.findOne({name:category});
        const image = await imageUploader(thumbnail, process.env.FOLDER_NAME);

               const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            tag,
            price,
            thumbnail: image.secure_url,
            category: categoryDetails._id,

        })
       
        //updating user schema
        await User.findByIdAndUpdate({
            _id: instructorDetails._id
        }, {
            $push: {
                course: newCourse._id
            }
        }, {
            new: true
        });
       
        //updationg tag schema
        await Category.findByIdAndUpdate({
            _id: categoryDetails._id
        },
            {
                course: newCourse._id
            }, { new: true });

            
            return res.status(200).json({
                message:"Course Creted"
            })
            
    }
    catch (error) {
        return res.json({
            message: "error"
        })
    }
}


exports.showAllCourse=async(req,res)=>{
    const allCourse=await Course.find({},{courseName:true,}).populate("instructor").exec();
    return res.json({
        data:allCourse
    })
}

exports.getAllDetails=async(req,res)=>{
    const {course_id}=req.body;

    const course=await Course.findById(course_id).populate({
                                                            path:"instructor",
                                                            populate:{
                                                                path:"additionalDetails",
                                                            },
                                                        })
                                                .populate("category")
                                                .populate("ratingAndReview")
                                                .populate({
                                                    path:"courseContent",
                                                    populate:{
                                                            path:subSection
                                                    }
                                                })
                                                .exec();

    return res.json({
        course:course
    })                                                
}