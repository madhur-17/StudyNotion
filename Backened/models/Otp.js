const mongoose=require("mongoose");
const mailSender=require("../utils/mailSender");

const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAT:{
        type:Date,
        default:Date.now(),
        
        expires:5*60
    }
});

const sendEmailVerification=async(email,otp)=>{
    try{
        const mailresponse=await mailSender(email,"Verficitation Email",otp);
    }
    catch(error){
        console.log(error);
    }
}


otpSchema.pre("sava",async(next)=>{
    await sendEmailVerification(this.email,this.otp);
    next();
})

module.exports=mongoose.model("Otp",otpSchema);