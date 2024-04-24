const User=require("../models/User");
const Otp=require("../models/Otp");
const otpgenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

exports.sendOtp=async(req,res)=>{
    try{
        const {email}=req.body;
    const checkUser=await User.findOne({email});
    if(checkUser){
        return res.json({
            message:"User Email Already Exists",
            success:false
        })
    }

    var otp=otpgenerator.generate(6,{
        lowerCaseAlphabets:false,
        upperCaseAlphabets:false,
        specialChars:false,
    });

    let result=await Otp.findOne({otp});
    while(result){
        otp=otpgenerator.generate(6,{
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            specialChars:false,
        });
        result=await Otp.findOne({otp});
    }

    const otpPayLoad={email,otp};
    const otpBody=await Otp.create(otpPayLoad);
    

    res.status(200).json({
        message:"Otp send"
    });


    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            message:"Error in otp sending",
            "error":error.message
        })
    }

}


//signup

exports.signUp=async(req,res)=>{
    try{
            const {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp

            }=req.body;
            if(!firstName||!lastName||!email||!password||!confirmPassword){
                return res.json({
                    success:false,
                    message:"All fields are needed",
                })
            }
            if(password!=confirmPassword){
                return res.status(400).jsin({
                    success:false,
                    message:"Password and ConfirmPassword does not match",
                })
            }
            const existUser=await User.findOne({email});
            if(existUser){
                return res.status(500).json({
                    message:"User email already exits",
                })
            }
            const recentotp=await Otp.find({email}).sort({createdAt:-1}).limit(1);
            if(recentotp.length==0){
                return res.status(400).json({
                    success:false,
                    message:"otp not found",
                })
            }
            if(otp!=recentotp.otp){
                return res.status(400).jsin({
                    success:false,
                    message:"enter correct otp",
                })
            }

            const profileDetail=await Profile.create({
                gender:null,
                dateOfBirth:null,
                contactNumber:null,
                about:null
            })
    
            const hashPassword=await bcrypt.hash(password,10);
            const user=await User.create({
                firstName,
                lastName,
                email,
                password:hashPassword,
                accountType,
                additionalDetails:profileDetail._id,
                image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`

               
            })
            return res.status(200).json({
                success:true,
                message:"Sign up Succesfull",
            })

    }
    catch(error){
        console.error(error);
        return res.status(400).json({
            success:false,
            messag:"user not signed in",
        })
    }
}



exports.signIn=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.json({
                message:"Enter correct Details"
            })
        }
        const user=await User.findOne({email});
        if(await bcrypt.compare(password,user.password))
        {
            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            })
            user.token=token;
            user.password=undefined;
            const options={
                expires: new Date(Date.now()+3*24*60*60*100),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).josn({
                success:true,
                token,
                user,
                message:"Logged in Successfully"
            })
        }
        else
        {
            return res.status(400).json({
                success:false,
                message:"Enter correct password",
            })
        }
        

    }
    catch(error){
        console.error(error);
        return res.status(400).json({
            success:false,
            messag:"Error while Siginning in ",
        })
    }
}

exports.changePassword=async(req,res)=>{
    
}