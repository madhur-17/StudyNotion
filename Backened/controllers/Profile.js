const Profile=require("../models/Profile");
const User=require("../models/User");
exports,updateProfile=async(req,res)=>{
    try{
        const {gender="",dateOfBirth="",contactNumber,about}=req.body;
        const user=User.findById(req.user.id);
        const updateDetails=Profile.findByIdAndUpdate(user.additionalDetails,{
            gender,dateOfBirth,contactNumber,about
        })
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