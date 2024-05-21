// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  showAllCourse,
  editCourse,
  getInstructorCourses,
  deleteCourse,
  getAllDetails,
  getFullCourseDetails
} = require("../controllers/Course")


// Categories Controllers Import
const {
  showAllCategory,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category")

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section")

// Sub-Sections Controllers Import
const {
  createSubSection,
  deleteSubSection,
  updateSubSection
} = require("../controllers/Subsection")

// Rating Controllers Import
const {
  createRating,
  avgRating,
  getAllReviews,
} = require("../controllers/RatingAndReview")



// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/getAllDetailsOfCourse",auth,isInstructor,getFullCourseDetails);

router.post("/addSubSection", auth, isInstructor, createSubSection);
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);
router.post("/updateSubSection",auth,isInstructor,updateSubSection);
// Get all Registered Courses
router.get("/getAllCourses", showAllCourse)
// Get Details for a Specific Courses

router.post("/editCourse", auth, isInstructor, editCourse)

router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
router.delete("/deleteCourse", deleteCourse)


// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategory)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", avgRating)
router.get("/getReviews", getAllReviews)

module.exports = router