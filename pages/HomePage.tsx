import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon } from '../components/icons';
import AnimalCard from '../components/AnimalCard';
import { MOCK_ANIMALS, MOCK_SUCCESS_STORIES } from '../constants';
import DonationModal from '../components/DonationModal';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <div className="w-full">
        {/* Hero Section */}
        <section 
          className="relative bg-cover bg-center text-white min-h-[65vh] flex items-center justify-center" 
          style={{ backgroundImage: "url('https://picsum.photos/seed/hero/1200/800')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
          <div className="relative text-center z-10 p-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold drop-shadow-2xl">{t('homePage.hero.title')}</h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-lg">
              {t('homePage.hero.subtitle')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/adopt"
                className="bg-orange-500 text-white font-bold py-3 px-10 rounded-full text-lg hover:bg-orange-600 transition-all transform hover:scale-105 duration-300 shadow-lg"
              >
                {t('homePage.hero.meetButton')}
              </Link>
              <a
                href="https://www.petbhai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/90 text-orange-500 font-bold py-3 px-10 rounded-full text-lg hover:bg-white transition-all transform hover:scale-105 duration-300 shadow-lg backdrop-blur-sm"
              >
                {t('homePage.hero.shopButton')}
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-6">{t('homePage.mission.title')}</h2>
            <p className="max-w-3xl mx-auto text-lg text-slate-800 dark:text-slate-200 leading-relaxed">
              {t('homePage.mission.text')}
            </p>
          </div>
        </section>

        {/* Adoption Preview Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4 text-center">{t('homePage.preview.title')}</h2>
              <p className="text-lg text-center text-slate-800 dark:text-slate-200 max-w-3xl mx-auto mb-12">
                  {t('homePage.preview.subtitle')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                  {MOCK_ANIMALS.slice(0, 3).map(animal => (
                      <AnimalCard key={animal.id} animal={animal} />
                  ))}
              </div>
              <div className="text-center mt-16">
                  <Link
                      to="/adopt"
                      className="inline-block bg-orange-500 text-white font-bold py-3 px-10 rounded-full text-lg hover:bg-orange-600 transition-all transform hover:scale-105 duration-300 shadow-lg"
                  >
                      {t('homePage.preview.viewAllButton')}
                  </Link>
              </div>
          </div>
        </section>

        {/* Quiz CTA Section */}
        <section className="py-20 bg-orange-500/10 dark:bg-orange-900/20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-6">{t('homePage.quiz.title')}</h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-800 dark:text-slate-200 leading-relaxed mb-8">
              {t('homePage.quiz.subtitle')}
            </p>
            <Link
              to="/quiz"
              className="inline-block bg-orange-500 text-white font-bold py-4 px-10 rounded-full text-xl hover:bg-orange-600 transition-all transform hover:scale-105 duration-300 shadow-lg"
            >
              {t('homePage.quiz.startButton')}
            </Link>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4 text-center">{t('homePage.success.title')}</h2>
            <p className="text-lg text-center text-slate-800 dark:text-slate-200 max-w-3xl mx-auto mb-12">
              {t('homePage.success.subtitle')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
              {MOCK_SUCCESS_STORIES.map(story => (
                <div key={story.id} className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/30 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden flex flex-col">
                  <img src={story.imageUrl} alt={story.name} className="w-full h-64 object-cover" loading="lazy" />
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{story.name}</h3>
                    <blockquote className="mt-4 border-l-4 border-orange-400 pl-4 italic text-slate-800 dark:text-slate-200 flex-grow">
                      <p>{story.story}</p>
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Volunteer CTA Section */}
        <section className="py-20">
            <div className="container mx-auto px-6">
                <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/30 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden lg:flex items-center">
                    <div className="lg:w-1/2">
                         <img src="https://picsum.photos/seed/volunteer/800/600" alt="Volunteer helping a dog" className="w-full h-64 lg:h-full object-cover" loading="lazy"/>
                    </div>
                    <div className="lg:w-1/2 p-8 md:p-12 text-center lg:text-left">
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">{t('homePage.volunteer.title')}</h2>
                        <p className="text-lg text-slate-800 dark:text-slate-200 leading-relaxed mb-8">
                            {t('homePage.volunteer.subtitle')}
                        </p>
                        <Link
                            to="/volunteer"
                            className="inline-block bg-orange-500 text-white font-bold py-3 px-10 rounded-full text-lg hover:bg-orange-600 transition-all transform hover:scale-105 duration-300 shadow-lg"
                        >
                            {t('homePage.volunteer.button')}
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        {/* Donate Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto p-10 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/30 dark:border-slate-700 rounded-2xl shadow-xl">
              <HeartIcon className="w-16 h-16 text-red-500 mx-auto mb-4 animate-heartbeat" />
              <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-6">{t('homePage.donate.title')}</h2>
              <p className="max-w-3xl mx-auto text-lg text-slate-800 dark:text-slate-200 leading-relaxed mb-8">
                {t('homePage.donate.subtitle')}
              </p>
              <button 
                onClick={() => setIsDonationModalOpen(true)}
                className="bg-red-500 text-white font-bold py-4 px-10 rounded-full text-xl hover:bg-red-600 transition-transform transform hover:scale-105 duration-300 shadow-lg"
              >
                {t('homePage.donate.button')}
              </button>
            </div>
          </div>
        </section>
      </div>
      <DonationModal 
        isOpen={isDonationModalOpen} 
        onClose={() => setIsDonationModalOpen(false)} 
      />
    </>
  );
};

export default React.memo(HomePage);