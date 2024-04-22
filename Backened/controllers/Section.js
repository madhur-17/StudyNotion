const Section=require("../models/Section");
const Course=require("../models/Course");


exports.createSection=async(req,res)=>{
    try{
        const {sectionName,courseId}=req.body;
        if(!sectionName){
            return res.json({
                message:"error",
            })
        }
        const sectionDetail=await Section.create({
            sectionName,
        })

        const couresUpdated=await Course.findByIdAndUpdate(courseId,{
            $push:{
                courseContent:sectionDetail._id,
            }
        },{
            new:true 
        })

        return res.status(200);
    }
    catch(error){
            return res.status(500).json({
                    success:false,
                    message:`${error.message}`
            })
    }
}


exports.updateSection=async(req,res)=>{
    try{
        const {sectionName,sectionId}=req.body;
        await Section.findByIdAndUpdate(sectionId,{sectionName});
        return res.status(200);
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:`${error.message}`
    })
    }
}

exports.deleteSection=async(req,res)=>{
    try{
        // id from params
        const {sectionId}=req.params;
        await Section.findByIdAndDelete(sectionId);
        return res.status(200);
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:`${error.message}`
    })
    }
}