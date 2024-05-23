const baseUrl = import.meta.env.VITE_BASE_URL;

export const categories={
    ALL_CATEGORIES_API: baseUrl+"/course/showAllCategories",
    CREATE_CATEGORIES_API:baseUrl+"/course/createCategory",
};

export const auth={
    RESET_PASSWORD_TOKEN:baseUrl+"/auth/reset-password-token",
    RESET_PASSWORD:baseUrl+"/auth/reset-password",
    SEND_OTP:baseUrl+"/auth/sendotp",
    SIGNUP:baseUrl+"/auth/signup",
    SIGNIN:baseUrl+"/auth/signin",

}

export const profile_endpoints={
    DELETE_PROFILE:baseUrl+"/profile/deleteProfile",
    UPDATE_PROFILE:baseUrl+"/profile/updateProfile",
    UPDATE_DISPLAY_PICTURE:baseUrl+"/profile/udateDisplayPicture",
    USER_DETAILS:baseUrl+"/profile/getAllUsersDetails",
    ENROLLED_COURSES:baseUrl+"/profile/getAllEnrolledCousres",
}

export const course_endpoints={
    CREATE_COURSE:baseUrl+"/course/createCourse",
    EDIT_COURSE:baseUrl+"/course/editCourse",
    INSTRUCTOR_COURSES:baseUrl+"/course/getInstructorCourses",
    DELETE_COURSE:baseUrl+"/course/deleteCourse",
    COURSE_DETAILS:baseUrl+"/course/getAllDetailsOfCourse",
}

export const section_endpoints={
    CREATE_SECTION:baseUrl+"/course/addSection",
    EDIT_SECTION:baseUrl+"/course/updateSection",
    DELETE_SECTION:baseUrl+"/course/deleteSection"
}

export const subSection_endpoints={
    CREATE_SUBSECTION:baseUrl+"/course/addSubSection",
    DELETE_SUBSECTION:baseUrl+"/course/deleteSubSection",
    UPDATE_SUBSECTION:baseUrl+"/course/updateSubSection"
}

export const category_endpoints={
    CATALOG_DATA:baseUrl+"/course/getCategoryPageDetails",
}