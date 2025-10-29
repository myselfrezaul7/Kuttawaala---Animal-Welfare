import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_ANIMALS } from '../constants';
import type { Animal } from '../types';
import { SearchIcon } from './icons';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Animal[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = MOCK_ANIMALS.filter(animal =>
      animal.name.toLowerCase().includes(searchLower) ||
      animal.breed.toLowerCase().includes(searchLower)
    );
    setResults(filtered);
  }, [searchTerm]);

  useEffect(() => {
    // Reset search on close
    if (!isOpen) {
      setTimeout(() => {
        setSearchTerm('');
        setResults([]);
      }, 300); // Allow for closing animation
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div 
      className={`fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex justify-center items-start pt-[15vh] md:pt-20 p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div 
        ref={modalRef} 
        className={`bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[70vh] flex flex-col transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center space-x-3">
          <SearchIcon className="w-6 h-6 text-slate-500 dark:text-slate-400 flex-shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a name or breed..."
            className="w-full bg-transparent text-lg text-slate-900 dark:text-slate-100 focus:outline-none"
            autoFocus
          />
           <button onClick={onClose} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-3xl font-light flex-shrink-0 leading-none">&times;</button>
        </div>
        <div className="overflow-y-auto">
          {searchTerm.trim() && results.length > 0 && (
            <ul className="divide-y divide-slate-100 dark:divide-slate-700">
              {results.map(animal => (
                <li key={animal.id}>
                  <Link to={`/adopt/${animal.id}`} onClick={onClose} className="flex items-center p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <img src={animal.imageUrl} alt={animal.name} className="w-16 h-16 object-cover rounded-md mr-4 flex-shrink-0"/>
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-100">{animal.name}</p>
                      <p className="text-slate-600 dark:text-slate-300">{animal.breed}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {searchTerm.trim() && results.length === 0 && (
            <div className="p-10 text-center">
              <p className="text-slate-600 dark:text-slate-300 font-semibold">No results found for "{searchTerm}"</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Try searching for a different name or breed.</p>
            </div>
          )}
           {!searchTerm.trim() && (
             <div className="p-10 text-center text-slate-500 dark:text-slate-400">
                <p>Start typing to find your new best friend.</p>
            </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
