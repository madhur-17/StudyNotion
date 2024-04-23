const { instance } = require("../config/RazorPay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail_format/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");


exports.capturePayment = async (req, res) => {
    try {
        const { course_id } = req.body;
        const user_id = req.user.id;

        // check if student already enrolled
        let course;
        try     {
                course = await Course.findById(course_id);
                // now user_id is string and in course schema stored in object id
                const userid = new mongoose.Types.ObjectId.createFromTime(parseInt(user_id));
                if (course.studentsEnrolled.includes(userid)) {
                    return res.status(200).json({
                        success: false,
                        message: "Student Already Enrolled",

                    })
                }



                }
             catch (error) {
                    return res.status(500);
                }

        const amount=course.price;
        const currency="INR";
        
        const paymantResponse=await instance.orders.create({
            amount:amount*100,
            currency:currency,
            notes:{
                    course_id,
                    user_id
                    },
            receipt:Math.random(Date.now()).toString(),
        })

        return res.json({
            success:true,
            message:"Course Purchased Succesfully",
            order_id:paymantResponse.id,
            amount:paymantResponse.amount
        })



    }
    catch (error) {
        return res.json({
            message: `${error}`
        })
    }
}



exports.verifySignature=async(req,res)=>{
    const webHookSecret="123456";
    const signature=req.headers["x-razorpay-signature"];
    const shasum=crypto.createHmac("sha256",webHookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest=shasum.digest("hex");
    if(signature==digest){
        console.log("Payment Aythorized");
        const {courseid,userid}=req.body.payload.payment.entity.notes;
        
        try{
            const enrolleduser=await User.findByIdAndUpdate(userid,{
                $push:{
                    course:courseid
                }
            },{new:ture});
            const enrolledcourse=await Course.findByIdAndUpdate(courseid,{
                $push:{
                    studentsEnrolled:userid
                }
            },{new:true})
            //mail-sender
            const mailbody=courseEnrollmentEmail(enrolledcourse.courseName,enrolleduser.firstName);
            const sendmail=await mailSender(enrolleduser.email,"Course Purchased Successfully",mailbody);
            return res.status(200);
        }
        catch(e)
        {
            return res.status(500);
        }

    }
    else{
        return res.status(400);
    }
}