import React from 'react';
import type { Vet } from '../types';
import { VideoCameraIcon } from './icons';

interface VetCardProps {
  vet: Vet;
  onBookAppointment: (vet: Vet) => void;
}

const VetCard: React.FC<VetCardProps> = ({ vet, onBookAppointment }) => {
  return (
    <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-2xl shadow-lg flex flex-col text-center items-center p-6 transform hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
      <div className="relative">
        <img className="w-32 h-32 rounded-full object-cover ring-4 ring-white/30 dark:ring-orange-500/20" src={vet.imageUrl} alt={`Dr. ${vet.name}`} />
        <span className={`absolute bottom-1 right-1 block h-5 w-5 rounded-full ${vet.isOnline ? 'bg-green-500' : 'bg-gray-400'} ring-2 ring-white dark:ring-slate-800`}></span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mt-4">{vet.name}</h3>
      <p className="text-slate-800 dark:text-slate-200 font-medium flex-grow">{vet.specialization}</p>
      <p className={`mt-2 font-semibold text-sm ${vet.isOnline ? 'text-green-700 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
        {vet.isOnline ? 'Available Now' : 'Offline'}
      </p>
      <button 
        onClick={() => onBookAppointment(vet)}
        disabled={!vet.isOnline}
        className="mt-4 w-full bg-orange-500 text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-orange-600 transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed"
      >
        <VideoCameraIcon className="w-5 h-5" />
        <span>Book Appointment</span>
      </button>
    </div>
  );
};

export default VetCard;