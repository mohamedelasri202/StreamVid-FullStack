import apiClient from '../api/axios.js';

/**
 * AUTHENTICATION
 */
export const loginUser = async (email, password) => {
    // Matches @PostMapping("/login")
    const response = await apiClient.post('/api/users/login', { email, password });
    return response.data; // Returns UserDTO
};

export const registerUser = async (userData) => {
    // Matches @PostMapping("/register")
    const response = await apiClient.post('/api/users/register', userData);
    return response.data;
};

/**
 * WATCHLIST (Ma Liste)
 */
export const fetchUserWatchlist = async (userId) => {
    // Matches @GetMapping("/{userId}/watchlist")
    return await apiClient.get(`/api/users/${userId}/watchlist`);
};

export const postToWatchlist = async (userId, videoId) => {
    // Matches @PostMapping("/{userId}/watchlist/{videoId}")
    return await apiClient.post(`/api/users/${userId}/watchlist/${videoId}`);
};

export const deleteFromWatchlist = async (userId, videoId) => {
    // Matches @DeleteMapping("/{userId}/watchlist/{videoId}")
    return await apiClient.delete(`/api/users/${userId}/watchlist/${videoId}`);
};

/**
 * HISTORY (Recently Watched / VU)
 */
export const postToHistory = async (userId, videoId) => {
    // Matches @PostMapping("/{userId}/history/{videoId}")
    return await apiClient.post(`/api/users/${userId}/history/${videoId}`);
};

/**
 * PROFILE
 */
export const fetchUserProfile = async (userId) => {
    // Matches @GetMapping("/{id}")
    return await apiClient.get(`/api/users/${userId}`);
};