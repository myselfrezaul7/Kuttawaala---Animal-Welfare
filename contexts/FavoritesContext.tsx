import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const FAVORITES_STORAGE_KEY = 'kuttawaala_favorites';

const getInitialFavorites = (): number[] => {
  try {
    const favorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error reading favorites from localStorage", error);
    return [];
  }
};

interface FavoritesContextType {
  favoriteIds: number[];
  toggleFavorite: (animalId: number) => void;
  isFavorite: (animalId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>(getInitialFavorites);

  useEffect(() => {
    try {
      window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch (error) {
      console.error("Error writing favorites to localStorage", error);
    }
  }, [favoriteIds]);

  const toggleFavorite = useCallback((animalId: number) => {
    setFavoriteIds(prevIds => {
      if (prevIds.includes(animalId)) {
        return prevIds.filter(id => id !== animalId);
      } else {
        return [...prevIds, animalId];
      }
    });
  }, []);

  const isFavorite = useCallback((animalId: number) => {
    return favoriteIds.includes(animalId);
  }, [favoriteIds]);

  const value = {
    favoriteIds,
    toggleFavorite,
    isFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};