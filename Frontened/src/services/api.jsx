const baseUrl = import.meta.env.VITE_BASE_URL;

export const categories={
    ALL_CATEGORIES_API: baseUrl+"/course/showAllCategories",
    CREATE_CATEGORIES_API:baseUrl+"/course/createCategory",
};