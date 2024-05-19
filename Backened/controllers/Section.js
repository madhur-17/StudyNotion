const Section=require("../models/Section");
const Course=require("../models/Course");

const SubSection=require("../models/SubSection");


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
        },
        {
            new:true 
        }).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();
        
        return res.status(200).json({
            success:true,
            data:couresUpdated,
        });
    }
    catch(error){
            return res.status(500).json({
                    success:false,
                    message:"hi"            })
    }
}


exports.updateSection=async(req,res)=>{
    try{
        const {sectionName,sectionId,courseId}=req.body;
        const newSection=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();
        return res.status(200).json({
            success:true,
            data:course
        });
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
        const {sectionId,courseId}=req.body;
        await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
        const section=await Section.findByIdAndDelete(sectionId);
        await SubSection.deleteMany({_id: {$in: section.subSection}});

        const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();
        return res.status(200).json({
            success:true,
            data:course,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:`${error.message}`
    })
    }
}