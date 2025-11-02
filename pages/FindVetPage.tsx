import React from 'react';
import { MOCK_VET_CLINICS } from '../constants';
import VetClinicCard from '../components/VetClinicCard';

const FindVetPage: React.FC = () => {
  return (
    <>
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50">Find a Vet Clinic</h1>
            <p className="text-lg text-slate-800 dark:text-slate-200 max-w-3xl mx-auto mt-4">
            Find trusted, local veterinary clinics for your pet's health needs. Please call ahead to confirm hours and availability for emergencies.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_VET_CLINICS.map(clinic => (
            <VetClinicCard key={clinic.id} clinic={clinic} />
          ))}
        </div>
        <div className="mt-16 bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 p-6 rounded-2xl max-w-3xl mx-auto text-center">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg">Disclaimer</h4>
            <p className="text-slate-800 dark:text-slate-200 mt-2 text-sm">
                The veterinary clinics listed above are for informational purposes only and are not sponsored by or affiliated with KUTTAWAALA. We do not receive any compensation for these listings. We encourage you to do your own research and consult at your own discretion when choosing a veterinary service for your pet.
            </p>
        </div>
      </div>
    </>
  );
};

export default FindVetPage;