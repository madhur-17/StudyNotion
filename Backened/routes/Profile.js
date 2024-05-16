const express = require("express")
const router = express.Router()
const { auth, isInstructor,isStudent } = require("../middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  updateDisplayPicture,
  getAllUsersDetails,
  getAllEnrolledCorses,
} = require("../controllers/Profile");



router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.put("/udateDisplayPicture",auth,updateDisplayPicture);
router.get("/getAllUsersDetails",auth,getAllUsersDetails);
router.get("/getAllEnrolledCousres",auth,isStudent,getAllEnrolledCorses)

module.exports = router