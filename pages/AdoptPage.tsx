import React from 'react';
import AnimalCard from '../components/AnimalCard';
import { MOCK_ANIMALS } from '../constants';

const AdoptPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-slate-800 mb-4">Find Your New Best Friend</h1>
      <p className="text-lg text-center text-slate-600 max-w-3xl mx-auto mb-16">
        These wonderful animals are waiting for a loving family to call their own. Click on a pet's profile to learn more about them and to start the adoption process.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {MOCK_ANIMALS.map(animal => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </div>
  );
};

export default AdoptPage;