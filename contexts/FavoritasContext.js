import React, { createContext, useContext, useState } from 'react';

const FavoritasContext = createContext();

export const favoritasProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (movie) => {
    setFavorites(prev => {
      const exists = prev.find(m => m.id === movie.id);
      if (exists) {
        return prev.filter(m => m.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  return (
    <FavoritasContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritasContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritasContext);