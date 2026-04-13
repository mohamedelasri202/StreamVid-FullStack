import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
    return (
        <Link to={`/watch/${video.id}`} className="block no-underline">
            {/* Fixed width for the Netflix "Row" look */}
            <div className="w-[160px] md:w-[220px] transition-transform duration-300 hover:scale-105 hover:z-50 cursor-pointer">

                {/* Aspect Ratio 2/3 for Movie Posters */}
                <div className="relative aspect-[2/3] bg-zinc-900 rounded-sm overflow-hidden shadow-md border border-zinc-800">
                    <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />

                    {/* Subtle Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Simple Info underneath (Netflix style is very minimal) */}
                <div className="mt-2 px-1">
                    <h3 className="text-white font-semibold text-xs md:text-sm truncate">
                        {video.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-green-500 font-bold">98% Match</span>
                        <span className="text-[10px] text-zinc-400 border border-zinc-700 px-1 rounded">
              {video.releaseYear}
            </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default VideoCard;