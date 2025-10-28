import React from 'react';
import type { Vet } from '../types';
import { VideoCameraIcon } from './icons';

interface VetCardProps {
  vet: Vet;
  onBookAppointment: (vet: Vet) => void;
}

const VetCard: React.FC<VetCardProps> = ({ vet, onBookAppointment }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col text-center items-center p-6 transform hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
      <div className="relative">
        <img className="w-32 h-32 rounded-full object-cover ring-4 ring-orange-100" src={vet.imageUrl} alt={`Dr. ${vet.name}`} />
        <span className={`absolute bottom-1 right-1 block h-5 w-5 rounded-full ${vet.isOnline ? 'bg-green-500' : 'bg-gray-400'} ring-2 ring-white`}></span>
      </div>
      <h3 className="text-xl font-bold text-slate-800 mt-4">{vet.name}</h3>
      <p className="text-slate-600 font-medium flex-grow">{vet.specialization}</p>
      <p className={`mt-2 font-semibold text-sm ${vet.isOnline ? 'text-green-600' : 'text-gray-500'}`}>
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