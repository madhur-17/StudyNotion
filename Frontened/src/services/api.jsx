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