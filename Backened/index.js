const express=require("express");
const app=express();

const {DBconnect} =require("./config/DataBase");
const {cloudconnect}=require("./config/Cloudinary");
const courseRouter=require("./routes/Course");
const paymentsRouter=require("./routes/Payments");
const profileRouter=require("./routes/Profile");
const userRouter=require("./routes/User");

const cookieParser=require("cookie-parser");
const cors=require("cors");
const fileUpload=require("express-fileupload");
const dotenv=require("dotenv");

dotenv.config();
const PORT=process.env.PORT;
DBconnect();
cloudconnect();

//middlewares

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",

}));

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp",
}));

app.use("/api/v1/auth",userRouter);
app.use("/api/v1/profile",profileRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/payment",paymentsRouter);


//default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your Server is Strong And Powerfulll...",
        Licensed:"MADHUR AGRAWAL",
    })
});


app.listen(PORT,()=>{
    console.log("SERVER STATES");
});