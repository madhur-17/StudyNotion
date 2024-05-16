const mongoose=require("mongoose");

const courseSchame=new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
    },
    courseDescription:{
        type:String,
        required:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    whatYouWillLearn:{
        type:String
    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
    }],
    ratingAndReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview",
    }],
    price:{
        type:Number,
    },
    thumbnail:{
        type:String
    },
    instructions:{
        type:[String]
    },
    tag:{
        type:[String],
       
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
        
    },
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    status:{
        type:"String",
        enum:["Draft","Published"]
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

module.exports=mongoose.model("Course",courseSchame);