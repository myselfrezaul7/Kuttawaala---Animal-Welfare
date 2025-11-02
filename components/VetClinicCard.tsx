import React from 'react';
import type { VetClinic } from '../types';
import { MapPinIcon, PhoneIcon, GlobeIcon } from './icons';

interface VetClinicCardProps {
  clinic: VetClinic;
}

const VetClinicCard: React.FC<VetClinicCardProps> = ({ clinic }) => {
  return (
    <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-2xl shadow-lg flex flex-col p-6 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{clinic.name}</h3>
      <p className="text-slate-800 dark:text-slate-200 mt-2 flex-grow">{clinic.address}</p>
      <div className="mt-4 border-t border-white/20 dark:border-white/10 pt-4 space-y-3 text-slate-800 dark:text-slate-200">
          <p className="flex items-center">
            <PhoneIcon className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0" />
            <span>{clinic.phone}</span>
          </p>
           <p className="flex items-center">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
            <span>{clinic.hours}</span>
          </p>
      </div>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <a 
            href={`tel:${clinic.phone}`} 
            className="flex items-center justify-center bg-orange-500/80 text-white font-bold py-2.5 px-3 rounded-lg hover:bg-orange-500 transition-colors text-center text-sm"
        >
            <PhoneIcon className="w-4 h-4 mr-2" /> Call
        </a>
        {clinic.website && (
             <a 
                href={clinic.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center bg-slate-700/80 text-white font-bold py-2.5 px-3 rounded-lg hover:bg-slate-700 transition-colors text-center text-sm"
            >
                <GlobeIcon className="w-4 h-4 mr-2" /> Website
            </a>
        )}
        <a 
            href={clinic.mapUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`flex items-center justify-center bg-slate-700/80 text-white font-bold py-2.5 px-3 rounded-lg hover:bg-slate-700 transition-colors text-center text-sm ${!clinic.website ? 'sm:col-span-2' : ''}`}
        >
            <MapPinIcon className="w-4 h-4 mr-2" /> Directions
        </a>
      </div>
    </div>
  );
};

export default VetClinicCard;
