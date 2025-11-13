import React, { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (postId) => {
    setFavorites((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const isFavorite = (postId) => favorites.includes(postId);

  const addFavorite = (postId) => {
    if (!favorites.includes(postId)) {
      setFavorites((prev) => [...prev, postId]);
    }
  };

  const removeFavorite = (postId) => {
    setFavorites((prev) => prev.filter((id) => id !== postId));
  };

  const clearFavorites = () => setFavorites([]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        addFavorite,
        removeFavorite,
        clearFavorites,
        favoritesCount: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};
