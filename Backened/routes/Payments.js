const express=require("express");
const router=express.Router();

const {capturePayment,verifySignature}=require("../controllers/Payment");
const{isStudent,auth}=require("../middlewares/auth");
router.post("/payment/capturepayment",auth,isStudent,capturePayment);
router.post("/payment/verifySignature",verifySignature);

module.exports=router;