const Profile=require("../models/Profile");
const User=require("../models/User");
const imageUploader=require("../utils/imageUploader");
exports.updateProfile=async(req,res)=>{
    try{
       
        const {gender="",dateOfBirth="",contactNumber,about}=req.body;
        const user=await User.findById(req.user.id);
    
        if(!user){
            return res.json({
                message:"User does not exist",
            })
        }
      
        const updateDetails=await Profile.findByIdAndUpdate(user.additionalDetails,{
            gender,dateOfBirth,contactNumber,about
        },{new:true});
        
        return res.status(200).json({updateDetails});
        
    }
    catch(error){
        return res.status(500);
    }
}


exports.deleteAccount=async(req,res)=>{
    try{
        const id=req.user.id;
        const user=User.findById(id);
        await Profile.findByIdAndDelete(user.additionalDetails);
        await User.findByIdAndDelete(id);
        return res.status(200);
    }
    catch(error){
        return res.status(500);
    }
}


exports.updateDisplayPicture=async(req,res)=>{

    const {file}=req.files;
    const userId=req.user.id;
    const response=await imageUploader(file,process.env.FOLDER_NAME);
    
    const updateUser=await User.findByIdAndUpdate(userId,{
        image:response.secure_url,
    },{new:true});
    res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updateUser,
      });
    
}


exports.getAllUsersDetails=async(req,res)=>{
    const userid=req.user.id;
    const details=await User.findById(userid).populate("additionalDetails").exec();
    return res.json({
        details,
    })
}

exports.getAllEnrolledCorses=async(req,res)=>{
    
    try{
        const userid=req.user.id;
        const user=await User.findById(userid).populate("course").exec();
        if(!user){
            return res.json({
                success:false,
                message:"Could not find any user"
            })
        }
        
        return res.status(200).json({
            success:true,
            message:"response madhur",
            data:user.course,
        })
    }
    catch(error){
        console.log(error);
    }
}