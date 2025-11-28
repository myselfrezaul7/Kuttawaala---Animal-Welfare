import React, { useState, useMemo } from 'react';
import { MOCK_VET_CLINICS, BANGLADESH_DISTRICTS } from '../constants';
import VetClinicCard from '../components/VetClinicCard';
import { useLanguage } from '../contexts/LanguageContext';

const FindVetPage: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const { t } = useLanguage();

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
      <div className="container mx-auto px-4 sm:px-6 py-16 min-h-screen">
        <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tight drop-shadow-sm">
                {t('findVetPage.title')}
            </h1>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 max-w-2xl mx-auto mt-6 font-light leading-relaxed">
                {t('findVetPage.subtitle')}
            </p>
        </div>

        {/* District Selector - Glass Style */}
        <div className="max-w-xl mx-auto mb-16 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white/40 dark:bg-slate-900/60 backdrop-blur-3xl rounded-2xl p-2 border border-white/50 dark:border-white/10 shadow-2xl">
                  <select
                    id="district-select"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full p-4 bg-transparent text-slate-900 dark:text-slate-50 text-lg font-medium outline-none cursor-pointer"
                    aria-label={t('findVetPage.select.label')}
                  >
                    <option value="" className="bg-slate-100 dark:bg-slate-800 text-slate-500">{t('findVetPage.select.placeholder')}</option>
                    {BANGLADESH_DISTRICTS.sort().map(district => (
                      <option key={district} value={district} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                         {t(`districts.${district}` as any, { defaultValue: district })}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-500 dark:text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                  </div>
              </div>
          </div>
        </div>

        {/* Conditional Rendering */}
        {selectedDistrict ? (
            filteredClinics.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                {filteredClinics.map(clinic => (
                    <VetClinicCard key={clinic.id} clinic={clinic} />
                ))}
                </div>
            ) : (
                <div className="text-center bg-white/20 dark:bg-slate-800/30 backdrop-blur-3xl border border-white/20 dark:border-white/10 p-10 rounded-3xl shadow-xl max-w-2xl mx-auto animate-pop">
                    <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-slate-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50">{t('findVetPage.results.none.title')}</h3>
                    <p className="text-slate-700 dark:text-slate-300 mt-4 text-lg">
                        {t('findVetPage.results.none.subtitle', { district: t(`districts.${selectedDistrict}` as any, { defaultValue: selectedDistrict }) })}
                    </p>
                </div>
            )
        ) : (
            <div className="text-center bg-white/10 dark:bg-slate-800/20 backdrop-blur-xl border border-white/20 dark:border-white/5 p-12 rounded-3xl shadow-lg max-w-3xl mx-auto mt-12">
                <div className="opacity-50 mb-6">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 mx-auto text-slate-400 dark:text-slate-600"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{t('findVetPage.results.placeholder')}</h3>
                <p className="text-slate-600 dark:text-slate-400 mt-2">Our database covers most major districts in Bangladesh.</p>
            </div>
        )}

        <div className="mt-24 text-center max-w-4xl mx-auto opacity-70 hover:opacity-100 transition-opacity">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
               {t('findVetPage.disclaimer.text')}
            </p>
        </div>
      </div>
    </>
  );
};

export default FindVetPage;