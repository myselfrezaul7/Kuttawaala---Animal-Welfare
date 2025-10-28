import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon } from '../components/icons';
import AnimalCard from '../components/AnimalCard';
import { MOCK_ANIMALS } from '../constants';
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
            <Link
              to="/adopt"
              className="mt-8 inline-block bg-orange-500 text-white font-bold py-3 px-10 rounded-full text-lg hover:bg-orange-600 transition-all transform hover:scale-105 duration-300 shadow-lg"
            >
              Meet Our Animals
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Our Mission</h2>
            <p className="max-w-3xl mx-auto text-lg text-slate-700 leading-relaxed">
              KUTTAWAALA is dedicated to providing a safe haven for stray, abandoned, and abused animals. We offer medical care, nourishment, and a loving environment, with the ultimate goal of finding them a forever family. We are a community-powered organization, and your support makes all the difference.
            </p>
          </div>
        </section>

        {/* Adoption Preview Section */}
        <section className="py-20 bg-slate-100">
          <div className="container mx-auto px-6">
              <h2 className="text-4xl font-bold text-slate-800 mb-4 text-center">Meet Some Friends</h2>
              <p className="text-lg text-center text-slate-600 max-w-3xl mx-auto mb-12">
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

        {/* Donate Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <HeartIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Your Support Saves Lives</h2>
            <p className="max-w-3xl mx-auto text-lg text-slate-700 leading-relaxed mb-8">
              Your generous donations help us provide food, shelter, and critical veterinary care to animals in need. Every contribution, big or small, helps us write a new chapter for a deserving animal.
            </p>
            <button 
              onClick={() => setIsDonationModalOpen(true)}
              className="bg-red-500 text-white font-bold py-4 px-10 rounded-full text-xl hover:bg-red-600 transition-transform transform hover:scale-105 duration-300 shadow-lg"
            >
              Donate Now
            </button>
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