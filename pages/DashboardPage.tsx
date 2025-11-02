import React, { useCallback } from 'react';
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
      case 'Approved': return 'text-green-600 dark:text-green-400 bg-green-500/10';
      case 'In Review': return 'text-blue-600 dark:text-blue-400 bg-blue-500/10';
      case 'Pending': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-500/10';
      case 'Rejected': return 'text-red-600 dark:text-red-400 bg-red-500/10';
      default: return 'text-slate-600 dark:text-slate-400 bg-slate-500/10';
    }
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4">Welcome, {currentUser?.name.split(' ')[0]}!</h1>
      <p className="text-lg text-slate-800 dark:text-slate-200 mb-12">This is your personal dashboard. Manage your favorites, applications, and donations here.</p>

      {/* Favorite Animals Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-6 border-b-2 border-orange-500 pb-2 flex items-center">
          <HeartIcon className="w-7 h-7 mr-3 text-red-500"/>
          Your Favorite Animals
        </h2>
        {favoriteAnimals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {favoriteAnimals.map(animal => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        ) : (
          <div className="text-center bg-white/20 dark:bg-black/20 p-8 rounded-2xl">
            <p className="text-slate-800 dark:text-slate-200">You haven't favorited any animals yet. Start exploring!</p>
            <Link to="/adopt" className="mt-4 inline-block bg-orange-500 text-white font-bold py-2 px-6 rounded-full hover:bg-orange-600 transition-colors">
              Find a Friend
            </Link>
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Adoption Applications Section */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-6 border-b-2 border-orange-500 pb-2">My Applications</h2>
          <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-2xl shadow-lg overflow-hidden">
            <ul className="divide-y divide-white/20 dark:divide-white/10">
              {MOCK_APPLICATIONS.map(app => (
                <li key={app.id} className="p-4 flex justify-between items-center hover:bg-white/10 dark:hover:bg-black/10 transition-colors">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-50">Application for <Link to={`/adopt/${app.animalId}`} className="hover:underline text-orange-600 dark:text-orange-400">{app.animalName}</Link></p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">Submitted: {app.date}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Donation History Section */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-6 border-b-2 border-orange-500 pb-2">Donation History</h2>
          <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-2xl shadow-lg overflow-hidden">
             <ul className="divide-y divide-white/20 dark:divide-white/10">
               {MOCK_DONATIONS.map(donation => (
                <li key={donation.id} className="p-4 flex justify-between items-center hover:bg-white/10 dark:hover:bg-black/10 transition-colors">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-50">BDT {donation.amount.toLocaleString()}</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">Donated on {donation.date}</p>
                  </div>
                   <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">via {donation.method}</span>
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