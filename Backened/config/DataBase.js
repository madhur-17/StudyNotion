const mongoose=require("mongoose");
require("dotenv").config();
exports.DBconnect= ()=>{
     mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("DB connected Successfully");
    })
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    })
}