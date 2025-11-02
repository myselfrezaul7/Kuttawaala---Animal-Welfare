import React, { useEffect, useRef, useState } from 'react';
import type { Animal } from '../types';
import FormError from './FormError';

interface AdoptionFormProps {
  animal: Animal;
  isOpen: boolean;
  onClose: () => void;
}

const AdoptionForm: React.FC<AdoptionFormProps> = ({ animal, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasOtherPets, setHasOtherPets] = useState(''); // 'yes' or 'no'

  // Focus trapping and Escape key handling for accessibility
  useEffect(() => {
    if (isOpen) {
      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Focus the first element (the close button) when the modal opens
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

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);


  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Randomly fail for demo purposes
        if (Math.random() > 0.8) {
            throw new Error("Submission failed. Please check your connection and try again.");
        }

        alert(`Thank you for your interest in adopting ${animal.name}! Your application has been submitted.`);
        onClose();
    } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
        setIsLoading(false);
    }
  };

  const inputStyle = "mt-1 block w-full p-2 bg-white/20 dark:bg-black/20 border border-white/40 dark:border-white/20 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-slate-900 dark:text-slate-50";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="adoption-form-title">
      <div ref={modalRef} className="bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
                <h2 id="adoption-form-title" className="text-3xl font-bold text-slate-900 dark:text-slate-50">Adoption Application</h2>
                <p className="text-slate-800 dark:text-slate-200 text-lg mt-1">You are applying to adopt: <span className="font-bold text-slate-900 dark:text-slate-50">{animal.name}</span></p>
            </div>
            <button ref={closeButtonRef} onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-4xl font-light">&times;</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Personal Info */}
            <fieldset className="border-t border-slate-300 dark:border-slate-600 pt-5">
                <legend className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3">Your Information</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Full Name</label>
                        <input type="text" id="fullName" required className={inputStyle} autoComplete="name" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Phone Number (Bangladesh)</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            pattern="(\+8801|01)[3-9]\d{8}" 
                            placeholder="+8801..." 
                            required 
                            className={inputStyle} 
                            autoComplete="tel" 
                            onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Please enter a valid Bangladesh phone number (e.g., 01xxxxxxxxx or +8801xxxxxxxxx)')}
                            onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                        />
                    </div>
                </div>
                 <div className="mt-4">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Email Address</label>
                    <input type="email" id="email" required className={inputStyle} autoComplete="email" />
                </div>
                 <div className="mt-4">
                    <label htmlFor="address" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Full Address (in Bangladesh)</label>
                    <textarea id="address" rows={3} required className={inputStyle} autoComplete="street-address"></textarea>
                </div>
            </fieldset>

            {/* Living Situation */}
            <fieldset className="border-t border-slate-300 dark:border-slate-600 pt-5">
                <legend className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3">Living Situation</legend>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Type of Residence</label>
                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                        <label className="flex items-center"><input type="radio" name="residence" value="apartment" required className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500"/> Apartment</label>
                        <label className="flex items-center"><input type="radio" name="residence" value="house" className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500"/> House</label>
                        <label className="flex items-center"><input type="radio" name="residence" value="other" className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500"/> Other</label>
                    </div>
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Do you own or rent your home?</label>
                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                        <label className="flex items-center"><input type="radio" name="ownRent" value="own" required className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500"/> Own</label>
                        <label className="flex items-center"><input type="radio" name="ownRent" value="rent" className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500"/> Rent</label>
                    </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">If you rent, please be prepared to show proof of landlord's permission for pets.</p>
                <div className="mt-4">
                    <label htmlFor="livingSituation" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Describe your living situation</label>
                    <textarea id="livingSituation" rows={3} required placeholder="e.g., House with a fenced yard, quiet apartment on the 3rd floor, etc." className={inputStyle}></textarea>
                </div>
            </fieldset>
            
            {/* Pet Experience */}
            <fieldset className="border-t border-slate-300 dark:border-slate-600 pt-5">
                <legend className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3">Pet Experience</legend>
                <div className="mt-4">
                    <label htmlFor="hoursAlone" className="block text-sm font-medium text-slate-700 dark:text-slate-200">How many hours will the pet be alone each day?</label>
                    <select id="hoursAlone" required className={inputStyle}>
                        <option value="">Select an option</option>
                        <option value="0-2">Less than 2 hours</option>
                        <option value="2-4">2-4 hours</option>
                        <option value="4-6">4-6 hours</option>
                        <option value="6-8">6-8 hours</option>
                        <option value="8+">More than 8 hours</option>
                    </select>
                </div>
                 <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Do you have other pets?</label>
                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                        <label className="flex items-center">
                            <input type="radio" name="otherPets" value="yes" required className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500" onChange={(e) => setHasOtherPets(e.target.value)} /> Yes
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="otherPets" value="no" className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500" onChange={(e) => setHasOtherPets(e.target.value)} /> No
                        </label>
                    </div>
                </div>
                {hasOtherPets === 'yes' && (
                    <div className="mt-4 animate-fadeIn">
                        <label htmlFor="otherPetsDetails" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Please tell us about your other pets</label>
                        <textarea id="otherPetsDetails" rows={3} required placeholder="Please list their species, age, and temperament." className={inputStyle}></textarea>
                    </div>
                )}
                 <div className="mt-4">
                    <label htmlFor="experience" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Please describe your experience with pets.</label>
                    <textarea id="experience" rows={4} required placeholder="Have you owned pets before? What kind? For how long?" className={inputStyle}></textarea>
                </div>
            </fieldset>
            
            <FormError message={error} />

            <div className="pt-5 border-t border-slate-300 dark:border-slate-600">
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="bg-slate-200/70 dark:bg-slate-600/70 text-slate-800 dark:text-slate-100 font-bold py-2 px-6 rounded-lg hover:bg-slate-300/80 dark:hover:bg-slate-500/80">
                  Cancel
                </button>
                <button type="submit" disabled={isLoading} className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-wait">
                  {isLoading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdoptionForm;