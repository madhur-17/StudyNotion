const Category=require("../models/Category");
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

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
            const allCategories=await Category.find({},{name:true,description:true}); // name and description should be present
            return res.status(200).json({
                success:true,

                data:allCategories
            })
    }
    catch(error){
        return res.status(500);
    }
}


exports.categoryPageDetails = async (req, res) => {
 console.log(req.body.categoryId);
    try {
      const { categoryId } = req.body
//console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "course",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
        
//console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      
      if (selectedCategory.course.length === 0) {
       console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
     // console.log(104);
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "course",
          match: { status: "Published" },
        })
        .exec()
        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      
      const allCategories = await Category.find()
        .populate({
          path: "course",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()
       
      const allCourses = allCategories.flatMap((category) => category.course)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: "er",
      })
    }
  }