const Course = require("../models/Course");
const Tag = require("../models/Tag");
const User = require("../models/User");
const imageUploader = require("../utils/imageUploader");




exports.createCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, whatYouWillLearn, price, tag } = req.body;
        const thumbnail = req.files.thumbnail;

        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        const tagDetails = await Tag.findById(tag);
        const image = await imageUploader(thumbnail, process.env.FOLDER_NAME);


        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,

            price,
            thumbnail: image.secure_url,
            tag: tagDetails._id,

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
        await Tag.findByIdAndUpdate({
            _id: tagDetails._id
        },
            {
                course: newCourse._id
            }, { new: true });


            return res.status(200).json({
                message:"Course Cretedx"
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