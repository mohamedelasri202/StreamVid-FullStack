import React, { useState, useEffect } from 'react';
import { fetchVideosByCategory } from '../services/videoService.js';
import VideoCard from './VideoCard';

const MovieRow = ({ title, category }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      const data = await fetchVideosByCategory(category);
      setMovies(data);
      setLoading(false);
    };
    if (category) getMovies();
  }, [category]);


  if (!loading && movies.length === 0) return null;

  return (
      <div className="mb-10 group">
        <h2 className="text-white text-xl md:text-2xl font-bold mb-4 px-4 md:px-12 group-hover:text-red-600 transition-colors">
          {title}
        </h2>

        <div className="relative">
          <div className="flex overflow-x-scroll scrollbar-hide space-x-4 px-4 md:px-12 pb-6 scroll-smooth">
            {loading ? (
                [...Array(6)].map((_, i) => (
                    <div key={i} className="min-w-[160px] md:min-w-[240px] aspect-[2/3] bg-zinc-900 animate-pulse rounded-md"></div>
                ))
            ) : (
                movies.map((video) => (
                    <div key={video.id} className="min-w-[160px] md:min-w-[240px]">
                      {/* Notice we pass the whole video object from your DB */}
                      <VideoCard video={video} />
                    </div>
                ))
            )}
          </div>
        </div>
      </div>
  );
};

export default MovieRow;