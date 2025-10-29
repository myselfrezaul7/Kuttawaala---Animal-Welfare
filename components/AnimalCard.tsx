import React from 'react';
import { Link } from 'react-router-dom';
import type { Animal } from '../types';

interface AnimalCardProps {
  animal: Animal;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  return (
    <Link to={`/adopt/${animal.id}`} className="block bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-black/20 overflow-hidden transform hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col group">
      <div className="relative">
        <img src={animal.imageUrl} alt={animal.name} className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wider">Learn More</p>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{animal.name}</h3>
        <p className="text-slate-600 dark:text-slate-300 font-medium">{animal.breed}</p>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">{animal.age} old &bull; {animal.gender}</p>
        <p className="text-slate-700 dark:text-slate-300 mt-4 flex-grow text-base line-clamp-3">{animal.description}</p>
      </div>
       <div className="p-4 bg-slate-50 dark:bg-slate-700/50 mt-auto border-t border-slate-100 dark:border-slate-700">
          <div className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg text-center transition-colors group-hover:bg-orange-600">
            Adopt Me
          </div>
        </div>
    </Link>
  );
};

export default AnimalCard;