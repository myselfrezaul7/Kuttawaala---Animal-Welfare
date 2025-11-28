import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Animal } from '../types';
import { useFavorites } from '../contexts/FavoritesContext';
import { HeartIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface AnimalCardProps {
  animal: Animal;
  index?: number;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, index = 0 }) => {
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
    setTimeout(() => setIsAnimating(false), 400); 
  }, [isAuthenticated, t, toggleFavorite, animal.id]);

  const handleCardClick = useCallback((e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigate(`/adopt/${animal.id}`);
  }, [animal.id, navigate]);


  return (
    <div 
      className="bg-white/20 dark:bg-black/20 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col group h-full relative"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={handleCardClick}
      role="link"
      aria-label={`Learn more about ${animal.name}`}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(e); }}
    >
      <div className="relative overflow-hidden h-40 sm:h-64">
        <img 
            src={animal.imageUrl} 
            alt={animal.name} 
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
            loading="lazy" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
        
        {isAuthenticated && (
            <button
              onClick={handleFavoriteClick}
              className={`absolute top-3 right-3 sm:top-4 sm:right-4 p-2.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/30 border border-white/20 transition-all duration-300 ${isAnimating ? 'animate-pop' : ''}`}
              aria-label={isCurrentlyFavorite ? t('animalCard.favorite.remove') : t('animalCard.favorite.add')}
            >
              <HeartIcon className={`w-5 h-5 drop-shadow-md ${isCurrentlyFavorite ? 'text-red-500 fill-red-500' : 'text-white'}`} />
            </button>
        )}
      </div>
      
      <div className="p-4 sm:p-6 flex flex-col flex-grow relative">
        {/* Glass overlap effect */}
        <div className="absolute -top-10 left-0 right-0 h-10 bg-gradient-to-t from-white/20 dark:from-black/20 to-transparent"></div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
            <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">{animal.name}</h3>
                <p className="text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm line-clamp-1 opacity-80">{animal.breed}</p>
            </div>
            <span className="mt-1 sm:mt-0 bg-white/30 dark:bg-white/10 text-slate-900 dark:text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-lg uppercase tracking-wider backdrop-blur-sm self-start sm:self-auto border border-white/20">
                {animal.gender}
            </span>
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 text-[10px] sm:text-xs mb-3 font-mono">{animal.age} old</p>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {animal.temperamentTags?.slice(0, 3).map(tag => (
            <span key={tag} className="bg-orange-500/10 dark:bg-orange-400/10 text-orange-700 dark:text-orange-300 text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-full border border-orange-500/20">
              {tag}
            </span>
          ))}
        </div>
        
        <p className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm line-clamp-2 leading-relaxed flex-grow opacity-90">
            {animal.description}
        </p>
      </div>
       <div className="p-4 bg-white/10 dark:bg-black/10 border-t border-white/20 dark:border-white/5 mt-auto">
          <div className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-2.5 px-4 rounded-xl text-center text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-orange-500/30 transform active:scale-95 tracking-wide">
            {t('animalCard.adoptMe')}
          </div>
        </div>
    </div>
  );
};

export default React.memo(AnimalCard);