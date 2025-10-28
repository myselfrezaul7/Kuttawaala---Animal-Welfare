import React from 'react';
import type { Animal } from '../types';

interface AdoptionFormProps {
  animal: Animal;
  isOpen: boolean;
  onClose: () => void;
}

const AdoptionForm: React.FC<AdoptionFormProps> = ({ animal, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for your interest in adopting ${animal.name}! Your application has been submitted.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose}>
      <div className="bg-slate-50 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
                <h2 className="text-3xl font-bold text-slate-800">Adoption Application</h2>
                <p className="text-slate-600 text-lg mt-1">You are applying to adopt: <span className="font-bold text-slate-800">{animal.name}</span></p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-4xl font-light">&times;</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Personal Info */}
            <fieldset className="border-t border-slate-200 pt-5">
                <legend className="text-xl font-semibold text-slate-700 mb-3">Your Information</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-slate-600">Full Name</label>
                        <input type="text" id="fullName" required className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-600">Phone Number (Bangladesh)</label>
                        <input type="tel" id="phone" pattern="(\+8801|01)[3-9]\d{8}" placeholder="+8801..." required className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
                    </div>
                </div>
                 <div className="mt-4">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-600">Email Address</label>
                    <input type="email" id="email" required className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
                </div>
                 <div className="mt-4">
                    <label htmlFor="address" className="block text-sm font-medium text-slate-600">Full Address (in Bangladesh)</label>
                    <textarea id="address" rows={3} required className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"></textarea>
                </div>
            </fieldset>

            {/* Living Situation */}
            <fieldset className="border-t border-slate-200 pt-5">
                <legend className="text-xl font-semibold text-slate-700 mb-3">Living Situation</legend>
                 <div>
                    <label className="block text-sm font-medium text-slate-600">Type of Residence</label>
                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                        <label className="flex items-center"><input type="radio" name="residence" value="apartment" className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500"/> Apartment</label>
                        <label className="flex items-center"><input type="radio" name="residence" value="house" className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500"/> House</label>
                        <label className="flex items-center"><input type="radio" name="residence" value="other" className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500"/> Other</label>
                    </div>
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-600">Do you own or rent your home?</label>
                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                        <label className="flex items-center"><input type="radio" name="ownRent" value="own" className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500"/> Own</label>
                        <label className="flex items-center"><input type="radio" name="ownRent" value="rent" className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500"/> Rent</label>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">If you rent, please be prepared to show proof of landlord's permission for pets.</p>
            </fieldset>
            
            {/* Pet Experience */}
            <fieldset className="border-t border-slate-200 pt-5">
                <legend className="text-xl font-semibold text-slate-700 mb-3">Pet Experience</legend>
                 <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-slate-600">Please describe your experience with pets.</label>
                    <textarea id="experience" rows={4} required placeholder="Have you owned pets before? What kind? For how long?" className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"></textarea>
                </div>
            </fieldset>

            <div className="pt-5 border-t border-slate-200">
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="bg-slate-200 text-slate-700 font-bold py-2 px-6 rounded-lg hover:bg-slate-300">
                  Cancel
                </button>
                <button type="submit" className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600">
                  Submit Application
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