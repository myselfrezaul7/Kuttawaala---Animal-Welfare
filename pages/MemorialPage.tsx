import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Memorial } from '../types';
import { MOCK_MEMORIALS } from '../constants';
import { ImageIcon, HeartIcon } from '../components/icons';
import FormError from '../components/FormError';

const MEMORIALS_STORAGE_KEY = 'kuttawaala_memorials';

const getInitialMemorials = (): Memorial[] => {
  try {
    const storedMemorials = window.localStorage.getItem(MEMORIALS_STORAGE_KEY);
    if (storedMemorials) {
      return JSON.parse(storedMemorials);
    }
    window.localStorage.setItem(MEMORIALS_STORAGE_KEY, JSON.stringify(MOCK_MEMORIALS));
    return MOCK_MEMORIALS;
  } catch (error) {
    console.error("Error reading memorials from localStorage", error);
    return MOCK_MEMORIALS;
  }
};

const MemorialCard: React.FC<{ memorial: Memorial }> = React.memo(({ memorial }) => (
  <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-2xl shadow-lg overflow-hidden flex flex-col group">
    <img src={memorial.imageUrl} alt={memorial.petName} className="w-full h-64 object-cover" loading="lazy" />
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{memorial.petName}</h3>
        <HeartIcon className="w-6 h-6 text-red-400" />
      </div>
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Lovingly remembered by {memorial.ownerName}</p>
      <p className="text-slate-800 dark:text-slate-200 flex-grow">{memorial.tribute}</p>
    </div>
  </div>
));

const MemorialForm: React.FC<{ isVisible: boolean; onClose: () => void; onSubmit: (memorial: Memorial) => void; }> = ({ isVisible, onClose, onSubmit }) => {
    const [petName, setPetName] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [tribute, setTribute] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    // Focus trapping and Escape key handling for accessibility
    useEffect(() => {
        if (isVisible) {
            const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (!focusableElements || focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            closeButtonRef.current?.focus();

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    onClose();
                    return;
                }
                if (e.key !== 'Tab') return;
                if (e.shiftKey) { // Shift+Tab
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            };
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isVisible, onClose]);


    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    }, []);

    const resetForm = useCallback(() => {
        setPetName('');
        setOwnerName('');
        setTribute('');
        setImage(null);
        setError('');
        setIsLoading(false);
        if(fileInputRef.current) fileInputRef.current.value = "";
        onClose();
    }, [onClose]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!petName || !ownerName || !tribute || !image) {
            setError("Please fill all fields and upload an image.");
            return;
        }
        setIsLoading(true);
        try {
            // Simulate submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            if (Math.random() > 0.8) {
                throw new Error("Failed to upload tribute. Please try again.");
            }
            onSubmit({
                id: Date.now(),
                petName,
                ownerName,
                tribute,
                imageUrl: image,
                timestamp: new Date().toISOString(),
            });
            resetForm();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [petName, ownerName, tribute, image, resetForm, onSubmit]);

    if (!isVisible) return null;

    const inputStyle = "w-full p-3 bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 text-slate-900 dark:text-slate-50 placeholder:text-slate-600 dark:placeholder:text-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white/30 dark:focus:bg-black/30 transition-colors";

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex justify-center items-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="memorial-form-title">
            <div ref={modalRef} className="bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 id="memorial-form-title" className="text-3xl font-bold text-slate-900 dark:text-slate-50">Share a Memory</h2>
                        <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-4xl font-light">&times;</button>
                    </div>
                    <FormError message={error} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="petName" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Pet's Name</label>
                            <input type="text" id="petName" value={petName} onChange={e => setPetName(e.target.value)} required className={inputStyle} autoComplete="off" />
                        </div>
                        <div>
                            <label htmlFor="ownerName" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Your Name</label>
                            <input type="text" id="ownerName" value={ownerName} onChange={e => setOwnerName(e.target.value)} required className={inputStyle} placeholder="e.g., The Khan Family" autoComplete="name" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="tribute" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Tribute</label>
                        <textarea id="tribute" value={tribute} onChange={e => setTribute(e.target.value)} rows={4} required placeholder="Share a few words about your beloved pet..." className={inputStyle}></textarea>
                    </div>
                     <div>
                        <label className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Photo of Your Pet</label>
                        {!image ? (
                             <div className="mt-2 flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/40 dark:border-white/20 border-dashed rounded-lg cursor-pointer bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20">
                                    <ImageIcon className="w-10 h-10 text-slate-700 dark:text-slate-300 mb-3" />
                                    <p className="text-sm text-slate-800 dark:text-slate-200"><span className="font-semibold">Click to upload</span></p>
                                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" required />
                                </label>
                            </div>
                        ) : (
                            <div className="mt-4 relative">
                                <img src={image} alt="Preview" className="max-h-60 w-full rounded-lg object-cover" />
                                <button type="button" onClick={() => {setImage(null); if(fileInputRef.current) fileInputRef.current.value = ""}} className="absolute top-2 right-2 bg-black/50 text-white rounded-full h-7 w-7 flex items-center justify-center font-bold text-lg hover:bg-black/80">&times;</button>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end pt-4 border-t border-slate-300 dark:border-slate-600">
                        <button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-orange-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-orange-600 transition-colors disabled:bg-orange-300 disabled:cursor-wait">
                            {isLoading ? 'Submitting...' : 'Submit Tribute'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const MemorialPage: React.FC = () => {
  const [memorials, setMemorials] = useState<Memorial[]>(getInitialMemorials);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(MEMORIALS_STORAGE_KEY, JSON.stringify(memorials));
    } catch (error) {
      console.error("Error writing memorials to localStorage", error);
    }
  }, [memorials]);
  
  const handleAddMemorial = useCallback((newMemorial: Memorial) => {
      setMemorials(prev => [newMemorial, ...prev]);
  }, []);

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50">The Memorial Wall</h1>
        <p className="text-lg text-slate-800 dark:text-slate-200 max-w-3xl mx-auto mt-4">
          A place to honor and remember the beloved animal companions who have crossed the rainbow bridge. Gone but never forgotten.
        </p>
      </div>

      <div className="text-center mb-12">
        <button 
            onClick={() => setIsFormVisible(true)}
            className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-all transform hover:scale-105 duration-300 shadow-lg"
        >
            Add a Tribute
        </button>
      </div>

      <MemorialForm 
        isVisible={isFormVisible} 
        onClose={() => setIsFormVisible(false)} 
        onSubmit={handleAddMemorial}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {memorials.map(memorial => (
          <MemorialCard key={memorial.id} memorial={memorial} />
        ))}
      </div>
    </div>
  );
};

export default MemorialPage;