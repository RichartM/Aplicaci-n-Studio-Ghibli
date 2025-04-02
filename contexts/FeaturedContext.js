import React, { createContext, useState, useContext } from 'react';

const FeaturedContext = createContext();

export const FeaturedProvider = ({ children }) => {
  const [featured, setFeatured] = useState([]);

  const toggleFeatured = (movie) => {
    setFeatured(prev => {
      const exists = prev.find(m => m.id === movie.id);
      if (exists) {
        return prev.filter(m => m.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  return (
    <FeaturedContext.Provider value={{ featured, toggleFeatured }}>
      {children}
    </FeaturedContext.Provider>
  );
};

export const useFeatured = () => useContext(FeaturedContext);