import React, { useState, useEffect } from 'react';
import MovieRow from '../components/MovieRow';
import VideoCard from '../components/VideoCard';
import { searchVideos } from '../services/videoService.js';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 2) {
        const results = await searchVideos(searchQuery);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
      <div className="bg-black min-h-screen pt-24 pb-10 px-4 md:px-12 text-white">

        {/* Search & Filter Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="relative w-full md:w-96">
            <input
                type="text"
                placeholder="Rechercher..."
                className="w-full bg-zinc-900 border border-zinc-700 py-2.5 px-10 rounded-md focus:border-red-600 outline-none text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-3 top-3">🔍</span>
          </div>

          {/* Filter Buttons matching your Java Enums */}
          <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800 overflow-x-auto">
            {[
              { id: 'all', label: 'Tout' },
              { id: 'ACTION', label: 'Action' },
              { id: 'COMEDIE', label: 'Comédie' },
              { id: 'DRAME', label: 'Drame' },
              { id: 'HORREUR', label: 'Horreur' }
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => {setFilter(item.id); setSearchQuery('');}}
                    className={`px-6 py-1.5 rounded-md text-sm font-bold transition-all ${
                        filter === item.id ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                >
                  {item.label}
                </button>
            ))}
          </div>
        </div>

        {/* VIEW 1: SEARCH RESULTS */}
        {searchQuery.length > 2 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {searchResults.map((video) => (
                  <VideoCard key={video.id} video={video} />
              ))}
            </div>
        ) : (
            /* VIEW 2: CATEGORY ROWS (SAME STRUCTURE AS BEFORE) */
            <div className="space-y-12">
              {filter === 'all' ? (
                  <>
                    <MovieRow title="Action Explosive" category="ACTION" />
                    <MovieRow title="Rire & Détente" category="COMEDIE" />
                    <MovieRow title="Grands Drames" category="DRAME" />
                    <MovieRow title="Frissons" category="HORREUR" />
                  </>
              ) : (
                  // If one filter is clicked, show just that row big
                  <MovieRow title={`Sélection: ${filter}`} category={filter} />
              )}
            </div>
        )}
      </div>
  );
};

export default Home;