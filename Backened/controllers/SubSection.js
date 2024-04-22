const Section=require("../models/Section");
const SubSection=require("../models/SubSection");
const {videoUploader}=require("../utils/videoUploader");

exports.createSubSection=async(req,res)=>{
    try{
        const {title,timeDuration,description,sectionid}=req.body;
        const {videoFile}=req.file;

        const videoDetails=await videoUploader(videoFile,process.env.FOLDER_NAME);

        const subSectionDetails=await SubSection.create({
            title,
            timeDuration,
            description,
            videoUrl:videoDetails.secure_url
        })


        await Section.findByIdAndUpdate(sectionid,{
            $push:{
                subSection:subSectionDetails._id,
            }
        })
        return res.status(200).json({
            success:true,
            message:"Sybsection created successfully"
        })
    } 
    catch(error){
        return res.status(500).json({
            success:false,
            message:`${error.message}`
    })
    }
}