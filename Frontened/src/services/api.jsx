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
    
}