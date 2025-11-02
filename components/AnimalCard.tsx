import React from 'react';
import { Link } from 'react-router-dom';
import type { Animal } from '../types';

interface AnimalCardProps {
  animal: Animal;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  return (
    <Link to={`/adopt/${animal.id}`} className="block bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-2xl shadow-lg overflow-hidden transform hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out flex flex-col group">
      <div className="relative">
        <img src={animal.imageUrl} alt={animal.name} className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wider">Learn More</p>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{animal.name}</h3>
        <p className="text-slate-800 dark:text-slate-200 font-medium">{animal.breed}</p>
        <p className="text-slate-700 dark:text-slate-300 mt-1 text-sm">{animal.age} old &bull; {animal.gender}</p>
        <p className="text-slate-800 dark:text-slate-200 mt-4 flex-grow text-base line-clamp-3">{animal.description}</p>
      </div>
       <div className="p-4 bg-white/10 dark:bg-black/10 mt-auto border-t border-white/30 dark:border-white/10">
          <div className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg text-center transition-colors group-hover:bg-orange-600">
            Adopt Me
          </div>
        </div>
    </Link>
  );
};

export default AnimalCard;