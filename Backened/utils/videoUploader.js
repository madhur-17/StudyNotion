const cloudinary = require('cloudinary').v2;
require("dotenv").config();


exports.videoUploader=async(file,folder)=>{
    const options={folder};
   
    options.resource_type="auto";

    return await cloudinary.uploader.upload(file.tempFilePath,options);


}