import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { VideoContext } from '../context/VideoContext';
import { getVideoById } from '../services/videoService.js'; // Import your new service

const VideoDetails = () => {
    const { id } = useParams();
    const { addToWatchlist, removeFromWatchlist, watchlist } = useContext(VideoContext);
    const [movie, setMovie] = useState(null);

    // Check if added to watchlist using the ID from params
    const isAdded = watchlist.some(m => m.id === parseInt(id));

    useEffect(() => {
        const getDetails = async () => {
            const data = await getVideoById(id);
            setMovie(data);
        };

        if (id) getDetails();
    }, [id]);

    if (!movie) return (
        <div className="pt-24 bg-black min-h-screen text-white flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
        </div>
    );

    return (
        <div className="pt-20 bg-black min-h-screen text-white px-4 md:px-12">
            <div className="max-w-6xl mx-auto">

                {/* VIDEO PLAYER SECTION */}
                <div className="group relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl bg-zinc-900 border border-zinc-800">
                    <iframe
                        width="100%"
                        height="100%"
                        // Use movie.url directly from your DB (e.g., https://www.youtube.com/embed/...)
                        src={`${movie.url}?autoplay=1&rel=0&modestbranding=1`}
                        title={movie.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0"
                    ></iframe>
                </div>

                {/* INFO & ACTIONS SECTION */}
                <div className="mt-8 flex flex-col md:flex-row md:justify-between items-start gap-8 pb-12">
                    <div className="md:w-2/3">
                        <div className="flex flex-col mb-4">
                            <h1 className="text-3xl md:text-5xl font-bold mb-2">{movie.title}</h1>
                            <div className="flex items-center space-x-3">
                                <span className="text-green-500 font-bold text-lg">98% Match</span>
                                <span className="text-zinc-400">{movie.releaseYear}</span>
                                <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-xs border border-zinc-700">
                    {movie.categoryName}
                  </span>
                            </div>
                        </div>

                        <p className="text-zinc-400 mb-6 text-sm md:text-base font-medium">
                            ⭐ <span className="text-white ml-1">{movie.rating || "N/A"} / 10</span> •
                            <span className="ml-2">{movie.duration || "N/A"}</span>
                        </p>

                        <p className="text-lg leading-relaxed text-zinc-300 max-w-3xl">
                            {movie.description || "Aucune description disponible."}
                        </p>

                        <div className="mt-6 text-sm text-zinc-500">
                            <p><span className="text-zinc-400">Réalisateur:</span> {movie.director}</p>
                            <p><span className="text-zinc-400">Distribution:</span> {movie.cast}</p>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4 w-full md:w-auto">
                        <button
                            onClick={() => isAdded ? removeFromWatchlist(movie.id) : addToWatchlist(movie)}
                            className={`flex items-center justify-center space-x-2 px-10 py-3 rounded font-bold transition-all duration-200 ${
                                isAdded
                                    ? 'bg-zinc-700 hover:bg-zinc-600 text-white'
                                    : 'bg-white hover:bg-zinc-200 text-black shadow-lg shadow-white/10'
                            }`}
                        >
                            <span className="text-xl">{isAdded ? '✓' : '+'}</span>
                            <span>{isAdded ? 'Dans ma liste' : 'Ma liste'}</span>
                        </button>

                        <div className="flex space-x-2">
                            <button className="flex-1 bg-zinc-800 p-3 rounded-full hover:bg-zinc-700 transition flex justify-center border border-zinc-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.704a1 1 0 01.94 1.347l-2.292 6.005A2 2 0 0115.469 19H8V11.123l3.183-5.305A1 1 0 0112.043 5H12a1 1 0 011 1v4h1z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoDetails;