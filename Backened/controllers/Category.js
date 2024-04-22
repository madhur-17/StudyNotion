const Category=require("../models/Category");

exports.createCategory=async(req,res)=>{
    try{
            const {name ,description} =req.body;
            if(!name||!description){
                return res.json({
                    success:true,
                    message:"Enter the proper details"  
                })
            }
            await Category.create({name,description})
            return res.status(200).json({
                success:true,
                message:"Category Created Successfully"
            })
    }
    catch(error){
        return res.status(500);
    }
}


exports.showAllCategory=async(req,res)=>{
    try{
            const allTags=await Category.find({},{name:true,decription:true}); // name and description should be present
            return res.status(200).json({
                Category:allTags
            })
    }
    catch(error){
        return res.status(500);
    }
}