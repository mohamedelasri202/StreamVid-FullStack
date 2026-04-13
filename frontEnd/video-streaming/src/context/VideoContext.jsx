import React, { createContext, useState, useEffect } from 'react';
import { postToWatchlist, fetchUserWatchlist, deleteFromWatchlist } from '../services/userService.js';

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [history, setHistory] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('loggedUser'));
  const userId = currentUser?.id;

  useEffect(() => {
    const syncWatchlist = async () => {
      if (userId) {
        try {
          const response = await fetchUserWatchlist(userId);
          setWatchlist(response.data);
          localStorage.setItem(`watchlist_${userId}`, JSON.stringify(response.data));
        } catch (error) {
          const saved = JSON.parse(localStorage.getItem(`watchlist_${userId}`)) || [];
          setWatchlist(saved);
        }
      }
    };
    syncWatchlist();
  }, [userId]);

  const addToWatchlist = async (movie) => {
    if (!watchlist.find(m => m.id === movie.id)) {
      try {
        await postToWatchlist(userId, movie.id);
        const updated = [...watchlist, { ...movie, addedAt: new Date() }];
        setWatchlist(updated);
        localStorage.setItem(`watchlist_${userId}`, JSON.stringify(updated));
      } catch (error) {
        console.error("Could not save to database watchlist", error);
      }
    }
  };

  const removeFromWatchlist = async (movieId) => {
    try {
      await deleteFromWatchlist(userId, movieId); // ← calls the backend
      const updated = watchlist.filter(m => m.id !== movieId);
      setWatchlist(updated);
      localStorage.setItem(`watchlist_${userId}`, JSON.stringify(updated));
    } catch (error) {
      console.error("Could not remove from database watchlist", error);
    }
  };

  return (
      <VideoContext.Provider value={{ watchlist, history, addToWatchlist, removeFromWatchlist }}>
        {children}
      </VideoContext.Provider>
  );
};