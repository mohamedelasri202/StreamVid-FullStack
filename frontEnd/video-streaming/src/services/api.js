const API_READ_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWVlZjRhZThlNDc2MDhkZDQ0ZTAxZWVhN2MzMDYzOCIsIm5iZiI6MTc3MDQ5MzAzNS42MjIwMDAyLCJzdWIiOiI2OTg3OTQ2YmFiZjBiNzMyMzI1ZDg5MmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AnzIKnRyj8miUP3zWalIQsuE02PqAfKmhkEb0zAUXz8';
  const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`
  }
};


export const fetchMovies = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();
    return data.results || []; 
  } catch (error) {
    console.error("API Error (fetchMovies):", error);
    return [];
  }
};


export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?language=fr-FR`, options);
    if (!response.ok) throw new Error('Unauthorized or Not Found');
    return await response.json();
  } catch (error) {
    console.error("API Error (fetchMovieDetails):", error);
    return null;
  }
};

export const fetchMovieTrailer = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/videos`, options);
    const data = await response.json();
    
    const trailer = data.results?.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );

    return trailer 
      ? `https://www.youtube.com/embed/${trailer.key}` 
      : `https://www.youtube.com/embed/dQw4w9WgXcQ`; 
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return null;
  }
};


export const searchMovies = async (query) => {
    try {
      const response = await fetch(`${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=fr-FR`, options);
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      return [];
    }

};