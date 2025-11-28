import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_ANIMALS } from '../constants';
import type { Animal } from '../types';
import { SearchIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Animal[]>([]);
  const [statusMessage, setStatusMessage] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([]);
      setStatusMessage('');
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = MOCK_ANIMALS.filter(animal =>
      animal.name.toLowerCase().includes(searchLower) ||
      animal.breed.toLowerCase().includes(searchLower)
    );
    setResults(filtered);

    if (filtered.length > 0) {
      const key = filtered.length === 1 ? 'modals.search.resultFound' : 'modals.search.resultsFound';
      setStatusMessage(t(key, { count: filtered.length }));
    } else {
      setStatusMessage(t('modals.search.noResults', { term: searchTerm }));
    }
  }, [searchTerm, t]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSearchTerm('');
        setResults([]);
        setStatusMessage('');
      }, 300); // Allow for closing animation
    } else {
      inputRef.current?.focus();
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
      className={`fixed inset-0 bg-black/50 backdrop-blur-lg z-50 flex justify-center items-start pt-[15vh] md:pt-20 p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div 
        ref={modalRef} 
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
        className={`bg-white/60 dark:bg-slate-800/70 backdrop-blur-2xl border border-white/30 dark:border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[70vh] flex flex-col transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="search-modal-title" className="sr-only">{t('modals.search.title')}</h2>
        <div className="p-4 border-b border-slate-300 dark:border-slate-600 flex items-center space-x-3">
          <SearchIcon className="w-6 h-6 text-slate-600 dark:text-slate-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('modals.search.placeholder')}
            aria-label="Search for an animal by name or breed"
            aria-controls="search-results-list"
            aria-autocomplete="list"
            className="w-full bg-transparent text-lg text-slate-900 dark:text-slate-100 focus:outline-none placeholder:text-slate-500 dark:placeholder:text-slate-400"
          />
           <button onClick={onClose} aria-label="Close search" className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 text-3xl font-light flex-shrink-0 leading-none">&times;</button>
        </div>

        <div className="sr-only" aria-live="polite" role="status">
          {statusMessage}
        </div>
        
        <div className="overflow-y-auto">
          {searchTerm.trim() && results.length > 0 && (
            <ul id="search-results-list" role="listbox" aria-label="Search results" className="divide-y divide-slate-200 dark:divide-slate-700">
              {results.map(animal => (
                <li key={animal.id} role="option">
                  <Link to={`/adopt/${animal.id}`} onClick={onClose} className="flex items-center p-4 hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors">
                    <img src={animal.imageUrl} alt={animal.name} className="w-16 h-16 object-cover rounded-md mr-4 flex-shrink-0"/>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-100">{animal.name}</p>
                      <p className="text-slate-700 dark:text-slate-300">{animal.breed}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {searchTerm.trim() && results.length === 0 && (
            <div className="p-10 text-center">
              <p className="text-slate-700 dark:text-slate-300 font-semibold" aria-hidden="true">{t('modals.search.noResults', { term: searchTerm })}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2" aria-hidden="true">{t('modals.search.noResults.suggestion')}</p>
            </div>
          )}
           {!searchTerm.trim() && (
             <div className="p-10 text-center text-slate-600 dark:text-slate-400">
                <p>{t('modals.search.initial')}</p>
            </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;