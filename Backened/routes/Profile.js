const express = require("express")
const router = express.Router()
const { auth, isInstructor } = require("../middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  updateDisplayPicture,
  getAllUsersDetails
  
} = require("../controllers/Profile")


router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.put("/udateDisplayPicture",auth,updateDisplayPicture);
router.get("/getAllUsersDetails",auth,getAllUsersDetails);

module.exports = router