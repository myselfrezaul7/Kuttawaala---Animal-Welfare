import React, { useState, useMemo } from 'react';
import { MOCK_VET_CLINICS, BANGLADESH_DISTRICTS } from '../constants';
import VetClinicCard from '../components/VetClinicCard';
import type { VetClinic } from '../types';

const FindVetPage: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const filteredClinics = useMemo(() => {
    if (!selectedDistrict) {
      return [];
    }
    return MOCK_VET_CLINICS.filter(
      clinic => clinic.district === selectedDistrict
    );
  }, [selectedDistrict]);

  return (
    <>
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50">Find a Vet Clinic</h1>
            <p className="text-lg text-slate-800 dark:text-slate-200 max-w-3xl mx-auto mt-4">
            Find trusted, local veterinary clinics for your pet's health needs. Please call ahead to confirm hours and availability for emergencies.
            </p>
        </div>

        {/* District Selector */}
        <div className="max-w-md mx-auto mb-12">
          <label htmlFor="district-select" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2 text-center">
            Select Your District
          </label>
          <select
            id="district-select"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full p-3 bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 text-slate-900 dark:text-slate-50 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white/30 dark:focus:bg-black/30 transition-colors text-lg"
          >
            <option value="">-- Choose a district --</option>
            {BANGLADESH_DISTRICTS.sort().map(district => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Conditional Rendering */}
        {selectedDistrict ? (
            filteredClinics.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fadeIn">
                {filteredClinics.map(clinic => (
                    <VetClinicCard key={clinic.id} clinic={clinic} />
                ))}
                </div>
            ) : (
                <div className="text-center bg-white/20 dark:bg-black/20 p-8 rounded-2xl max-w-2xl mx-auto animate-fadeIn">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">No Clinics Found</h3>
                    <p className="text-slate-800 dark:text-slate-200 mt-4">
                        We don't have any clinics listed for "{selectedDistrict}" at the moment. Please check back later or try a nearby district.
                    </p>
                </div>
            )
        ) : (
            <div className="text-center bg-white/20 dark:bg-black/20 p-8 rounded-2xl max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Please select a district to view vet clinics.</h3>
            </div>
        )}

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