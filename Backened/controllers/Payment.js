const { instance } = require("../config/RazorPay");
const Course = require("../models/Course");
const User = require("../models/User");
const crypto=require("crypto");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail_format/templates/courseEnrollmentEmail");
const {paymentSuccessEmail} =require("../mail_format/templates/paymentSuccessEmail")
const mongoose = require("mongoose");
const CourseProgress =require("../models/CourseProgress")
exports.capturePayment=async(req,res)=>{
    const {courses}=req.body;
    const userId=req.user.id;

    if(courses.length==0){
        return res.json({
            success:false,
            message:"Please Enter Course"
        })
    }
    let totalAmount=0;
    for(const courseId of courses ){
        try{
            const course=await Course.findById(courseId);
            if(!course){
                return res.json({success:false});
            }
            const uid=new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.json({success:false});
            }
    
            totalAmount=totalAmount+course.price;
        }
        catch(error){
            return res.statuu(500).json({
                success:false,
                message:error.message
            })
        }
    }

    const options={
        amount:totalAmount*100,
        currency:"INR",
        receipt:Math.random(Date.now()).toString(),
    }

    try{
        const paymentResponse=await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }



}


exports.verifyPayment=async(req,res)=>{
    const razorpay_order_id=req.body?.razorpay_order_id;
    const razorpay_payment_id=req.body?.razorpay_payment_id;
    const razorpay_signature=req.body?.razorpay_signature;
    const courses=req.body?.courses;
    const userId=req.user.id;


    if(!razorpay_order_id||!razorpay_payment_id||!razorpay_signature||!courses||!userId)
        {
            return res.json({
                success:false,
            })
        }
    let body=razorpay_order_id+"|"+razorpay_payment_id;
    const expectedSignature=crypto.createHmac("sha256",process.env.RAZOR_PAY_SECRET).update(body.toString()).digest("hex");


    if(expectedSignature===razorpay_signature)
        {
            await enrollStudents(courses, userId, res)
            return res.status(200).json({success:true,message:"Payment verified"});
        }
    return res.json({success:false})
}
const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide Course ID and User ID" })
    }
  
    for (const courseId of courses) {
      try {
        // Find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $push: { studentsEnrolled: userId } },
          { new: true }
        )
  
        if (!enrolledCourse) {
          return res
            .status(500)
            .json({ success: false, error: "Course not found" })
        }
       console.log("Updated course: ", enrolledCourse)
  
        const courseprogress = await CourseProgress.create({
          courseId: courseId,
          userId: userId,
          completedVideos: [],
        })
        // Find the student and add the course to their list of enrolled courses
        const enrolledStudent = await User.findByIdAndUpdate(
          userId,
          {
            $push: {
              course: courseId,
              courseProgress: courseprogress._id,
            },
          },
          { new: true }
        )
  
       // console.log("Enrolled student: ", enrolledStudent)
        // Send an email notification to the enrolled student
        const emailResponse = await mailSender(
          enrolledStudent.email,
          `Successfully Enrolled into ${enrolledCourse.courseName}`,
          courseEnrollmentEmail(
            enrolledCourse.courseName,
            `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
          )
        )
  
        
      } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: error.message })
      }
    }
  }

  exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body
  
    const userId = req.user.id
  
    if (!orderId || !paymentId || !amount || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all the details" })
    }
  
    try {
      const enrolledStudent = await User.findById(userId)
  
      await mailSender(
        enrolledStudent.email,
        `Payment Received`,
        paymentSuccessEmail(
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
          amount / 100,
          orderId,
          paymentId
        )
      )
    } catch (error) {
      console.log("error in sending mail", error)
      return res
        .status(400)
        .json({ success: false, message: "Could not send email" })
    }
  }
//use for single item only
// exports.capturePayment = async (req, res) => {
//     try {
//         const { course_id } = req.body;
//         const user_id = req.user.id;

//         // check if student already enrolled
//         let course;
//         try     {
//                 course = await Course.findById(course_id);
//                 // now user_id is string and in course schema stored in object id
//                 const userid = new mongoose.Types.ObjectId.createFromTime(parseInt(user_id));
//                 if (course.studentsEnrolled.includes(userid)) {
//                     return res.status(200).json({
//                         success: false,
//                         message: "Student Already Enrolled",

//                     })
//                 }



//                 }
//              catch (error) {
//                     return res.status(500);
//                 }

//         const amount=course.price;
//         const currency="INR";
        
//         const paymantResponse=await instance.orders.create({
//             amount:amount*100,
//             currency:currency,
//             notes:{
//                     course_id,
//                     user_id
//                     },
//             receipt:Math.random(Date.now()).toString(),
//         })

//         return res.json({
//             success:true,
//             message:"Course Purchased Succesfully",
//             order_id:paymantResponse.id,
//             amount:paymantResponse.amount
//         })



//     }
//     catch (error) {
//         return res.json({
//             message: `${error}`
//         })
//     }
// }



// exports.verifySignature=async(req,res)=>{
//     const webHookSecret="123456";
//     const signature=req.headers["x-razorpay-signature"];
//     const shasum=crypto.createHmac("sha256",webHookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest=shasum.digest("hex");
//     if(signature==digest){
//         console.log("Payment Aythorized");
//         const {courseid,userid}=req.body.payload.payment.entity.notes;
        
//         try{
//             const enrolleduser=await User.findByIdAndUpdate(userid,{
//                 $push:{
//                     course:courseid
//                 }
//             },{new:ture});
//             const enrolledcourse=await Course.findByIdAndUpdate(courseid,{
//                 $push:{
//                     studentsEnrolled:userid
//                 }
//             },{new:true})
//             //mail-sender
//             const mailbody=courseEnrollmentEmail(enrolledcourse.courseName,enrolleduser.firstName);
//             const sendmail=await mailSender(enrolleduser.email,"Course Purchased Successfully",mailbody);
//             return res.status(200);
//         }
//         catch(e)
//         {
//             return res.status(500);
//         }

//     }
//     else{
//         return res.status(400);
//     }
// }