import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon } from '../components/icons';
import AnimalCard from '../components/AnimalCard';
import { MOCK_ANIMALS, MOCK_SUCCESS_STORIES } from '../constants';
import DonationModal from '../components/DonationModal';

const HomePage: React.FC = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

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
            <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-2xl">Giving Paws a Second Chance</h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-lg">
              At KUTTAWAALA, we believe every animal deserves a loving home. Join us in our mission to rescue, rehabilitate, and rehome animals in need.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/adopt"
                className="bg-orange-500 text-white font-bold py-3 px-10 rounded-full text-lg hover:bg-orange-600 transition-all transform hover:scale-105 duration-300 shadow-lg"
              >
                Meet Our Animals
              </Link>
              <a
                href="https://www.petbhai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/90 text-orange-500 font-bold py-3 px-10 rounded-full text-lg hover:bg-white transition-all transform hover:scale-105 duration-300 shadow-lg backdrop-blur-sm"
              >
                Visit Our Shop
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-6">Our Mission</h2>
            <p className="max-w-3xl mx-auto text-lg text-slate-800 dark:text-slate-200 leading-relaxed">
              KUTTAWAALA is dedicated to providing a safe haven for stray, abandoned, and abused animals. We offer medical care, nourishment, and a loving environment, with the ultimate goal of finding them a forever family. We are a community-powered organization, and your support makes all the difference.
            </p>
          </div>
        </section>

        {/* Adoption Preview Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4 text-center">Meet Some Friends</h2>
              <p className="text-lg text-center text-slate-800 dark:text-slate-200 max-w-3xl mx-auto mb-12">
                  These lovely souls are looking for a forever home. Maybe one of them is for you?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {MOCK_ANIMALS.slice(0, 3).map(animal => (
                      <AnimalCard key={animal.id} animal={animal} />
                  ))}
              </div>
              <div className="text-center mt-16">
                  <Link
                      to="/adopt"
                      className="inline-block bg-orange-500 text-white font-bold py-3 px-10 rounded-full text-lg hover:bg-orange-600 transition-all transform hover:scale-105 duration-300 shadow-lg"
                  >
                      View All Animals
                  </Link>
              </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4 text-center">Happy Tails</h2>
            <p className="text-lg text-center text-slate-800 dark:text-slate-200 max-w-3xl mx-auto mb-12">
              Read the heartwarming stories of animals who found their forever homes through KUTTAWAALA.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {MOCK_SUCCESS_STORIES.map(story => (
                <div key={story.id} className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-2xl shadow-lg overflow-hidden flex flex-col">
                  <img src={story.imageUrl} alt={story.name} className="w-full h-64 object-cover" />
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

        {/* Donate Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto p-10 bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-2xl shadow-lg">
              <HeartIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-6">Your Support Saves Lives</h2>
              <p className="max-w-3xl mx-auto text-lg text-slate-800 dark:text-slate-200 leading-relaxed mb-8">
                Your generous donations help us provide food, shelter, and critical veterinary care to animals in need. Every contribution, big or small, helps us write a new chapter for a deserving animal.
              </p>
              <button 
                onClick={() => setIsDonationModalOpen(true)}
                className="bg-red-500 text-white font-bold py-4 px-10 rounded-full text-xl hover:bg-red-600 transition-transform transform hover:scale-105 duration-300 shadow-lg"
              >
                Donate Now
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

export default HomePage;