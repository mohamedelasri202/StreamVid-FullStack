import apiClient from '../api/axios.js';

/**
 * Fetch all videos belonging to a specific category name (e.g., ACTION, DRAME)
 */
export const fetchVideosByCategory = async (category) => {
    try {
        const response = await apiClient.get(`/api/videos/category/${category}`);
        return response.data; // List of VideoDTOs from your DB
    } catch (error) {
        console.error("Error fetching category:", error);
        return [];
    }
};

/**
 * Search for videos by title
 */
export const searchVideos = async (query) => {
    try {
        const response = await apiClient.get(`/api/videos/search?title=${query}`);
        return response.data;
    } catch (error) {
        console.error("Error searching videos:", error);
        return [];
    }
};

/**
 * Fetch a single video's full details by its ID
 * Used for the VideoDetails (Watch) page
 */
export const getVideoById = async (id) => {
    try {
        // Matches your Java Controller: @GetMapping("/find/{id}")
        const response = await apiClient.get(`/api/videos/find/${id}`);
        return response.data; // Returns a single VideoDTO object
    } catch (error) {
        console.error(`Error fetching video with ID ${id}:`, error);
        return null;
    }
};