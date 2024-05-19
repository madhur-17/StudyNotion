const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth=async(req,res,next)=>{
    try{
        //console.log(req.headers);
       console.log(req.header("Authorization"));
       // console.log(7);
       // const token = req?.cookies?.token || 
        //(req.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : undefined);
        const token =
			req.cookies.token ||
			req.body.token ||
			req.header('Authorization')?.replace("Bearer ", "");
          // console.log(token);
        
        if(!token){
            return res.json({
                success:false,
                message:"Eror in validation token not exist"
            })
        }
        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode;
        }
        catch(error){
            return res.json({
                success:false,
                message:error.message
            })
        }
        next();
    }
    catch(err){
        console.error(err);
        return res.json({
            success:false,
            message:err.message
        })
    }
}


exports.isStudent=async(req,res,next)=>{
     try{
            if(req.user.accountType!=="Student"){
                return res.json({
                    success:false,
                    message:"Protected route for students only"
                });
            }
            next();
     }
     catch(error){
        console.error(error);
         return res.statue(400);
     }
     
}
exports.isInstructor=async(req,res,next)=>{
    try{
           if(req.user.accountType!=="Instructor"){
               return res.json({
                   success:false,
                   message:"Protected route for instructor only"
               });
           }
           next();
    }
    catch(error){
       console.error(error);
        return res.statue(400);
    }
}

exports.isAdmin=async(req,res,next)=>{
    try{
           if(req.user.accountType!=="Admin"){
               return res.json({
                   success:false,
                   message:"Protected route for admin only"
               });
           }
           next();
    }
    catch(error){
       console.error(error);
        return res.statue(400);
    }
}