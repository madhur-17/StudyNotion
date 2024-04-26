const mongoose=require("mongoose");
const mailSender=require("../utils/mailSender");
const otpTemplate=require("../mail_format/templates/emailVerificationTemplate");

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
        
        const mailresponse=await mailSender(email,"Verficitation Email",otpTemplate(otp));
       
    }
    catch(error){
        console.log(error);
    }
}


otpSchema.pre("save",async function(next){     // async(next)=>{}  ->never use this arrow function when using this
 
    if (this.isNew) {
		await sendEmailVerification(this.email, this.otp);
	}
    next();
})

module.exports=mongoose.model("Otp",otpSchema);