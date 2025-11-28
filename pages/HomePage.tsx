import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, ArrowUpIcon } from '../components/icons';
import AnimalCard from '../components/AnimalCard';
import { MOCK_ANIMALS, MOCK_SUCCESS_STORIES } from '../constants';
import DonationModal from '../components/DonationModal';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <div className="w-full overflow-hidden">
        {/* Hero Section */}
        <section 
          className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" 
        >
          {/* Background Image with Parallax-like fixed attachment */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-105"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-slate-900/90 dark:to-[#0f172a]"></div>
          
          <div className="relative text-center z-10 px-4 max-w-5xl mx-auto animate-fade-in-up">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-widest uppercase mb-6 animate-float">
                Rescue &middot; Rehabilitate &middot; Rehome
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white tracking-tight drop-shadow-2xl mb-6">
              {t('homePage.hero.title')}
            </h1>
            <p className="text-lg md:text-2xl text-slate-100 max-w-3xl mx-auto mb-10 leading-relaxed font-light drop-shadow-md">
              {t('homePage.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                to="/adopt"
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-4 px-10 rounded-full text-lg hover:shadow-lg hover:shadow-orange-500/40 transition-all transform hover:scale-105 duration-300"
              >
                {t('homePage.hero.meetButton')}
              </Link>
              <a
                href="https://www.petbhai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white/10 text-white border border-white/30 font-bold py-4 px-10 rounded-full text-lg hover:bg-white/20 transition-all transform hover:scale-105 duration-300 backdrop-blur-md"
              >
                {t('homePage.hero.shopButton')}
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto bg-white/30 dark:bg-black/30 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">{t('homePage.mission.title')}</h2>
                <p className="text-xl text-slate-700 dark:text-slate-200 leading-relaxed font-light">
                {t('homePage.mission.text')}
                </p>
            </div>
          </div>
        </section>

        {/* Adoption Preview Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-10 sm:mb-16">
                  <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">{t('homePage.preview.title')}</h2>
                  <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-light">
                      {t('homePage.preview.subtitle')}
                  </p>
              </div>
              {/* Updated Grid: 2 cols on mobile, 3 on large screens */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10">
                  {MOCK_ANIMALS.slice(0, 3).map((animal, idx) => (
                      <AnimalCard key={animal.id} animal={animal} index={idx} />
                  ))}
              </div>
              <div className="text-center mt-12 sm:mt-16">
                  <Link
                      to="/adopt"
                      className="inline-flex items-center justify-center px-8 py-3 bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 rounded-full text-slate-900 dark:text-white font-bold text-lg hover:bg-white/40 dark:hover:bg-white/10 transition-all group shadow-lg"
                  >
                      {t('homePage.preview.viewAllButton')}
                      <ArrowUpIcon className="w-5 h-5 ml-2 transform rotate-90 group-hover:translate-x-1 transition-transform" />
                  </Link>
              </div>
          </div>
        </section>

        {/* Quiz CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-br from-orange-400 to-pink-600 rounded-3xl p-8 sm:p-10 md:p-20 text-center shadow-2xl relative overflow-hidden transform transition-transform hover:scale-[1.01] duration-500 border border-white/20">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-sm">{t('homePage.quiz.title')}</h2>
                    <p className="max-w-2xl mx-auto text-lg sm:text-xl text-orange-50 leading-relaxed mb-10 font-light drop-shadow-sm">
                    {t('homePage.quiz.subtitle')}
                    </p>
                    <Link
                    to="/quiz"
                    className="inline-block bg-white/90 text-orange-600 font-bold py-4 px-12 rounded-full text-xl hover:bg-white transition-all transform hover:scale-105 duration-300 shadow-xl"
                    >
                    {t('homePage.quiz.startButton')}
                    </Link>
                </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center">{t('homePage.success.title')}</h2>
            <p className="text-lg text-center text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-16">
              {t('homePage.success.subtitle')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {MOCK_SUCCESS_STORIES.map((story, idx) => (
                <div key={story.id} className="bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-3xl shadow-xl overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300" style={{ animationDelay: `${idx * 150}ms` }}>
                  <div className="h-64 overflow-hidden relative">
                    <img src={story.imageUrl} alt={story.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">{story.name}</h3>
                  </div>
                  <div className="p-8 flex flex-col flex-grow relative">
                    <div className="absolute -top-6 right-6 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg">
                        <HeartIcon className="w-6 h-6 fill-white"/>
                    </div>
                    <blockquote className="italic text-slate-700 dark:text-slate-200 flex-grow relative pl-2 leading-relaxed">
                        <span className="text-4xl text-orange-300 dark:text-orange-500/50 leading-none mr-2">"</span>
                        {story.story}
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Volunteer CTA Section */}
        <section className="py-24">
            <div className="container mx-auto px-6">
                <div className="bg-slate-900/5 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white/20">
                             <img src="https://images.unsplash.com/photo-1593134257782-e89567b7718a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Volunteer helping a dog" className="w-full h-auto object-cover" loading="lazy"/>
                        </div>
                    </div>
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-2 block">Join the Team</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">{t('homePage.volunteer.title')}</h2>
                        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10 font-light">
                            {t('homePage.volunteer.subtitle')}
                        </p>
                        <Link
                            to="/volunteer"
                            className="inline-block bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 px-10 rounded-full text-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-all transform hover:scale-105 duration-300 shadow-xl"
                        >
                            {t('homePage.volunteer.button')}
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        {/* Donate Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="max-w-4xl mx-auto p-12 bg-white/60 dark:bg-slate-800/60 backdrop-blur-3xl border border-white/50 dark:border-white/10 rounded-[3rem] shadow-2xl">
              <div className="inline-flex justify-center items-center w-24 h-24 rounded-full bg-red-100/50 dark:bg-red-900/30 mb-8 animate-pulse-slow backdrop-blur-sm">
                 <HeartIcon className="w-12 h-12 text-red-500" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">{t('homePage.donate.title')}</h2>
              <p className="max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
                {t('homePage.donate.subtitle')}
              </p>
              <button 
                onClick={() => setIsDonationModalOpen(true)}
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold py-5 px-16 rounded-full text-xl hover:shadow-lg hover:shadow-red-500/30 transition-all transform hover:scale-105 duration-300"
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