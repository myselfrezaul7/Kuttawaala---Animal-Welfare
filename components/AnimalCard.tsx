import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Animal } from '../types';
import { useFavorites } from '../contexts/FavoritesContext';
import { HeartIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface AnimalCardProps {
  animal: Animal;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  
  const isCurrentlyFavorite = isFavorite(animal.id);

  const handleFavoriteClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
        alert(t('animalCard.favorite.loginPrompt'));
        return;
    }
    toggleFavorite(animal.id);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300); // Duration of the pop animation
  }, [isAuthenticated, t, toggleFavorite, animal.id]);

  const handleCardClick = useCallback((e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    const navigateToDetails = () => navigate(`/adopt/${animal.id}`);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        navigateToDetails, // Success
        navigateToDetails, // Error
        { timeout: 5000 }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      navigateToDetails();
    }
  }, [animal.id, navigate]);


  return (
    <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/30 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden transform hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out flex flex-col group"
      onClick={handleCardClick}
      role="link"
      aria-label={`Learn more about ${animal.name}`}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(e); }}
    >
      <div className="relative">
        <img src={animal.imageUrl} alt={animal.name} className="w-full h-56 object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wider">{t('animalCard.learnMore')}</p>
        </div>
        {isAuthenticated && (
            <button
              onClick={handleFavoriteClick}
              className={`absolute top-4 right-4 p-2 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-sm transition-colors duration-300 ${isAnimating ? 'animate-pop' : ''}`}
              aria-label={isCurrentlyFavorite ? t('animalCard.favorite.remove') : t('animalCard.favorite.add')}
            >
              <HeartIcon className={`w-6 h-6 ${isCurrentlyFavorite ? 'text-red-500' : 'text-white/80'}`} />
            </button>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
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
      </div>
       <div className="p-4 bg-white/20 dark:bg-slate-900/20 mt-auto border-t border-white/30 dark:border-slate-700">
          <div className="block w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg text-center transition-colors group-hover:bg-orange-600">
            {t('animalCard.adoptMe')}
          </div>
        </div>
    </div>
  );
};

export default React.memo(AnimalCard);