import React from 'react';
import type { Vet } from '../types';

interface VetBookingModalProps {
  vet: Vet | null;
  isOpen: boolean;
  onClose: () => void;
}

const VetBookingModal: React.FC<VetBookingModalProps> = ({ vet, isOpen, onClose }) => {
  if (!isOpen || !vet) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Appointment request sent for ${vet.name}! You will receive a confirmation shortly.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose}>
      <div className="bg-slate-50 rounded-2xl shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
                <h2 className="text-3xl font-bold text-slate-800">Book Appointment</h2>
                <p className="text-slate-600 text-lg mt-1">with <span className="font-bold text-slate-800">{vet.name}</span></p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-4xl font-light">&times;</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                  <label htmlFor="petName" className="block text-sm font-medium text-slate-600">Pet's Name</label>
                  <input type="text" id="petName" required className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-slate-600">Reason for Consultation</label>
                  <textarea id="reason" rows={3} required placeholder="e.g., Skin rash, unusual behavior..." className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-slate-600">Preferred Date</label>
                    <input type="date" id="date" required className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                    <label htmlFor="time" className="block text-sm font-medium text-slate-600">Preferred Time</label>
                    <input type="time" id="time" required className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
                </div>
              </div>

            <div className="pt-5 border-t border-slate-200 mt-2">
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="bg-slate-200 text-slate-700 font-bold py-2 px-6 rounded-lg hover:bg-slate-300">
                  Cancel
                </button>
                <button type="submit" className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600">
                  Request Appointment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VetBookingModal;