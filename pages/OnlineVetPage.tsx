import React, { useState } from 'react';
import { MOCK_VETS } from '../constants';
import type { Vet } from '../types';
import VetCard from '../components/VetCard';
import VetBookingModal from '../components/VetBookingModal';

const OnlineVetPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVet, setSelectedVet] = useState<Vet | null>(null);

  const handleOpenModal = (vet: Vet) => {
    setSelectedVet(vet);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVet(null);
  };

  return (
    <>
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800">Consult a Veterinarian Online</h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
            Get professional advice for non-emergency situations from the comfort of your home. Our licensed veterinarians are here to help you with your pet's health concerns.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_VETS.map(vet => (
            <VetCard key={vet.id} vet={vet} onBookAppointment={handleOpenModal} />
          ))}
        </div>
      </div>
      <VetBookingModal 
        vet={selectedVet}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default OnlineVetPage;