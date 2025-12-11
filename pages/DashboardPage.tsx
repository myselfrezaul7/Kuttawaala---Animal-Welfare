import * as React from 'react';
import { useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { MOCK_ANIMALS, MOCK_APPLICATIONS, MOCK_DONATIONS } from '../constants';
import AnimalCard from '../components/AnimalCard';
import { HeartIcon } from '../components/icons';

const DashboardPage: React.FC = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { favoriteIds } = useFavorites();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const favoriteAnimals = MOCK_ANIMALS.filter(animal => favoriteIds.includes(animal.id));

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'Approved': return 'text-green-700 dark:text-green-300 bg-green-500/20 border border-green-500/20';
      case 'In Review': return 'text-blue-700 dark:text-blue-300 bg-blue-500/20 border border-blue-500/20';
      case 'Pending': return 'text-yellow-700 dark:text-yellow-300 bg-yellow-500/20 border border-yellow-500/20';
      case 'Rejected': return 'text-red-700 dark:text-red-300 bg-red-500/20 border border-red-500/20';
      default: return 'text-slate-600 dark:text-slate-400 bg-slate-500/20';
    }
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white/30 dark:bg-black/30 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-[3rem] p-8 sm:p-12 mb-12 shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Welcome, {currentUser?.name.split(' ')[0]}!</h1>
        <p className="text-lg text-slate-700 dark:text-slate-300">This is your personal dashboard. Manage your favorites, applications, and donations here.</p>
      </div>

      {/* Favorite Animals Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 border-b border-white/20 pb-4 flex items-center">
          <div className="bg-red-500/20 p-2 rounded-full mr-4 backdrop-blur-sm">
            <HeartIcon className="w-6 h-6 text-red-500"/>
          </div>
          Your Favorite Animals
        </h2>
        {favoriteAnimals.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {favoriteAnimals.map(animal => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        ) : (
          <div className="text-center bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-white/10 p-12 rounded-[3rem] shadow-lg">
            <p className="text-xl text-slate-700 dark:text-slate-300 mb-6">You haven't favorited any animals yet.</p>
            <Link to="/adopt" className="inline-block bg-white dark:bg-white/10 border border-white/40 text-slate-900 dark:text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              Find a Friend
            </Link>
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Adoption Applications Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pl-4 border-l-4 border-orange-500">My Applications</h2>
          <div className="bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-[2rem] shadow-lg overflow-hidden">
            <ul className="divide-y divide-white/20 dark:divide-white/10">
              {MOCK_APPLICATIONS.map(app => (
                <li key={app.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-white/20 dark:hover:bg-white/5 transition-colors">
                  <div className="mb-2 sm:mb-0">
                    <p className="font-bold text-lg text-slate-900 dark:text-white">Application for <Link to={`/adopt/${app.animalId}`} className="hover:underline text-orange-600 dark:text-orange-400">{app.animalName}</Link></p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Submitted: {app.date}</p>
                  </div>
                  <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full ${getStatusColor(app.status)} backdrop-blur-sm`}>
                    {app.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Donation History Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pl-4 border-l-4 border-pink-500">Donation History</h2>
          <div className="bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-[2rem] shadow-lg overflow-hidden">
             <ul className="divide-y divide-white/20 dark:divide-white/10">
               {MOCK_DONATIONS.map(donation => (
                <li key={donation.id} className="p-6 flex justify-between items-center hover:bg-white/20 dark:hover:bg-white/5 transition-colors">
                  <div>
                    <p className="font-bold text-lg text-slate-900 dark:text-white">BDT {donation.amount.toLocaleString()}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Donated on {donation.date}</p>
                  </div>
                   <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-white/30 dark:bg-black/30 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10">{donation.method}</span>
                </li>
               ))}
             </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;