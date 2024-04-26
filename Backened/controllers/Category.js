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
            const category=await Category.findOne({name:name});
            console.log(13);
            if(category){
                return res.status(500).json({
                    success:false,
                    messgae:"Category Already Exist",

                });
            }
            console.log(21);
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
            const allTags=await Category.find({},{name:true,description:true}); // name and description should be present
            return res.status(200).json({
                Category:allTags
            })
    }
    catch(error){
        return res.status(500);
    }
}


exports.categoryPageDetails=async(req,res)=>{
    try{
        const {categoryId}=req.body;
        //same category
        const selected=await Category.findById(categoryId).populate("course").exec();
        if(!payload)
        {
            return res.status(500);
        }
        //different catregory
        const different=await Category.find({
            _id:{$ne:categoryId}
        }).populate("course").exec();

        //get top selling course

        return res.status(200).json({
            selected,
            different
        })



    }
    catch(error){
        return res.status(400);
    }
}