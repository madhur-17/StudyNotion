const Tag=require("../models/Tag");

exports.createTag=async(req,res)=>{
    try{
            const {name ,description} =req.body;
            if(!name||!description){
                return res.json({
                    success:true,
                    message:"Enter the proper details"  
                })
            }
            await Tag.create({name,description})
            return res.status(200).json({
                success:true,
                message:"Tag Created Successfully"
            })
    }
    catch(error){
        return res.status(500);
    }
}


exports.showAllTag=async(req,res)=>{
    try{
            const allTags=await Tag.find({},{name:true,decription:true}); // name and description should be present
            return res.status(200).json({
                tags:allTags
            })
    }
    catch(error){
        return res.status(500);
    }
}