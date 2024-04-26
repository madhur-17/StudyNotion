const Section=require("../models/Section");
const Course=require("../models/Course");


exports.createSection=async(req,res)=>{
    try{
        const {sectionName,courseId}=req.body;
        console.log(8);
        if(!sectionName){
            return res.json({
                message:"error",
            })
        }
        console.log(14);
        const sectionDetail=await Section.create({
            sectionName,
        })
        console.log(18);
        const couresUpdated=await Course.findByIdAndUpdate(courseId,{
            $push:{
                courseContent:sectionDetail._id,
            }
        },{
            new:true 
        })
        console.log(26);
        return res.status(200).json({
            message:true
        });
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