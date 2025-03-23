const getBaseUrl = () => {
    // Use environment variable for API URL if available, otherwise fall back to localhost for development
    return import.meta.env.VITE_API_URL || "https://book-app-backend-blond.vercel.app";
}

export default getBaseUrl;