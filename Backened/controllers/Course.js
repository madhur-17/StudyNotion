const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const Section=require("../models/Section");
const SubSection=require("../models/SubSection");
const imageUploader = require("../utils/imageUploader");




exports.createCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, whatYouWillLearn, price, tag:_tag,category,status,instructions: _instructions,} = req.body;
        const thumbnail = req.files.thumbnail;

        const userId = req.user.id;
        const tag = JSON.parse(_tag)
        
        const instructions = JSON.parse(_instructions)
        const instructorDetails = await User.findById(userId);
       
        const categoryDetails = await Category.findById(category);
        const image = await imageUploader(thumbnail, process.env.FOLDER_NAME);

       

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
            thumbnail:image.secure_url,
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
              $push:{
                course: newCourse._id
            }
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
      console.log(83);
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
    const {courseId}=req.body;

    const course=await Course.findById(courseId).populate({
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
                                                            path:"SubSection",
                                                    }
                                                })
                                                .exec();

    return res.json({
        success:true,
        course:course
    })                                                
}



exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}


exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }
     await Category.findByIdAndUpdate(course.category,{
            $pull:{
              course:courseId
            }
     })
    // Delete the course
   
   
   
   
   
   
    await Course.findByIdAndDelete(courseId)

    
    
    
    
    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}




exports.getFullCourseDetails = async (req, res) => {
  
  try {
    
    const { courseId } = req.body
    const userId = req.user.id
   
    const courseDetails = await Course.findById(courseId)
    .populate({
        path: "instructor",
        populate: {
            path: "additionalDetails",
        },
    })
    .populate("ratingAndReviews")
    .populate("category")
    
    .populate({
        path: "courseContent",
        populate: {
            path: "subSection",
        },
    })
    .exec();


    
  
      
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    

    return res.status(200).json({
      success: true,
      data: courseDetails,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "317"
    })
  }
}