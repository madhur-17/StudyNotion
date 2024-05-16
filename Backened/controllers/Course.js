const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const imageUploader = require("../utils/imageUploader");




exports.createCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, whatYouWillLearn, price, tag:_tag,category,status,instructions: _instructions,} = req.body;
        //const thumbnail = req.files.thumbnail;

        const userId = req.user.id;
        const tag = JSON.parse(_tag)
        
        const instructions = JSON.parse(_instructions)
        const instructorDetails = await User.findById(userId);
       
        const categoryDetails = await Category.findById(category);
       // const image = await imageUploader(thumbnail, process.env.FOLDER_NAME);

       

        if (!status || status === undefined) {
            status = "Draft"
          }
  
          
            const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            tag,
            price,
            thumbnail: "https://google.com",
            category: categoryDetails._id,
            status: status,
            instructions,

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
                message:"Course Created",
                success:true,
                data:newCourse

            })
            
    }
    catch (error) {
        return res.json({
            message: error.message
        })
    }
}

exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await imageUploader(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
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