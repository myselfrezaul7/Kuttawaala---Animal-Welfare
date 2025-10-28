import React from 'react';
import { Link } from 'react-router-dom';
import type { Animal } from '../types';

interface AnimalCardProps {
  animal: Animal;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  return (
    <Link to={`/adopt/${animal.id}`} className="block bg-white rounded-xl shadow-md overflow-hidden transform hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col group">
      <div className="relative">
        <img src={animal.imageUrl} alt={animal.name} className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wider">Learn More</p>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-slate-800">{animal.name}</h3>
        <p className="text-slate-600 font-medium">{animal.breed}</p>
        <p className="text-gray-500 mt-1 text-sm">{animal.age} old &bull; {animal.gender}</p>
        <p className="text-slate-700 mt-4 flex-grow text-base line-clamp-3">{animal.description}</p>
      </div>
       <div className="p-4 bg-slate-50 border-t border-slate-100 mt-auto">
          <p className="text-center font-semibold text-orange-600 group-hover:text-orange-700">
            View Details & Adopt
          </p>
        </div>
    </Link>
  );
};

export default AnimalCard;