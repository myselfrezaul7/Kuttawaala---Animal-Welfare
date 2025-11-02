import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Animal } from '../types';
import { useFavorites } from '../contexts/FavoritesContext';
import { HeartIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';

interface AnimalCardProps {
  animal: Animal;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const isCurrentlyFavorite = isFavorite(animal.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
        alert("Please log in to save your favorites!");
        return;
    }
    toggleFavorite(animal.id);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300); // Duration of the pop animation
  };

  return (
    <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-2xl shadow-lg overflow-hidden transform hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out flex flex-col group">
      <div className="relative">
        <Link to={`/adopt/${animal.id}`} className="block">
            <img src={animal.imageUrl} alt={animal.name} className="w-full h-56 object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wider">Learn More</p>
            </div>
        </Link>
        {isAuthenticated && (
            <button
              onClick={handleFavoriteClick}
              className={`absolute top-4 right-4 p-2 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-sm transition-colors duration-300 ${isAnimating ? 'animate-pop' : ''}`}
              aria-label={isCurrentlyFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <HeartIcon className={`w-6 h-6 ${isCurrentlyFavorite ? 'text-red-500' : 'text-white/80'}`} />
            </button>
        )}
      </div>
      <Link to={`/adopt/${animal.id}`} className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{animal.name}</h3>
        <p className="text-slate-800 dark:text-slate-200 font-medium">{animal.breed}</p>
        <p className="text-slate-700 dark:text-slate-300 mt-1 text-sm">{animal.age} old &bull; {animal.gender}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {animal.temperamentTags?.map(tag => (
            <span key={tag} className="bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 text-xs font-semibold px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-slate-800 dark:text-slate-200 mt-4 flex-grow text-base line-clamp-3">{animal.description}</p>
      </Link>
       <div className="p-4 bg-white/10 dark:bg-black/10 mt-auto border-t border-white/30 dark:border-white/10">
          <Link to={`/adopt/${animal.id}`} className="block w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg text-center transition-colors group-hover:bg-orange-600">
            Adopt Me
          </Link>
        </div>
    </div>
  );
};

export default React.memo(AnimalCard);