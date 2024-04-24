const { default: mongoose } = require("mongoose");
const RatingAndReview=require("../models/RatingAndReview");
const Course=require("../models/Course.js");


exports.createRating=async(req,res)=>{
    const user_id=req.user.id;
    const{course_id,rating,review}=req.body;


    const course=await Course.findOne({_id:course_id,
                                         studentsEnrolled:{$elemMatch:{$eq:user_id}}   });
    
    const alreadayReviewed=await RatingAndReview.findOne({
        user:user_id,
        course:course_id,
    })
    if(alreadayReviewed){
        return res.json({
            message:"Already reviewed",
        })
    }
    
    const payload=await RatingAndReview.create({
        rating,
        review,
        course:course_id,
        user:user_id,
    });
    await Course.findByIdAndUpdate(course_id,{
        $push:{
            ratingAndReview:payload._id, 
        }
    });

    return res.status(200);
}


exports.avgRating=async(req,res)=>{
    const course_id=req.body;
    const avg=RatingAndReview.aggregate([
        {
            $match:{
                course:new mongoose.Types.ObjectId(course_id),

            },
        },
        {
            $group:{
                _id:null,
                avgerageRating:{$avg:"$rating"}
            }

        }
    ])

    if(avg.lenght>0){
        return res.json({
            avgRating:avg[0].avgerageRating,
        })
    }
    return res.json({
        avgRating:0,
    })

}


exports.getAllReviews=async(req,res)=>{
    try{
        const alldata=await RatingAndReview.find({})
                            .sort({rating:"desc"})
                            .populate({
                                path:"user",
                                select:"firstName email image",
                            })
                            .populate({
                                path:"course",
                                select:"courseName",
                            })
                            .exec();

        return res.json({alldata});
    }
    catch(erorr){
        return res.status(400);
    }
}